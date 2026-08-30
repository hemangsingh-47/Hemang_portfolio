export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const username = req.query.username || "hemang47";

  try {
    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              userAvatar
              realName
            }
            userCalendar {
              submissionCalendar
            }
          }
          allQuestionsCount {
            difficulty
            count
          }
        }`,
        variables: { username }
      })
    });

    if (!gqlRes.ok) {
      throw new Error(`LeetCode GraphQL responded with ${gqlRes.status}`);
    }

    const data = await gqlRes.json();
    if (!data.data?.matchedUser) {
      return res.status(404).json({ error: "User not found or LeetCode error" });
    }

    const user = data.data.matchedUser;
    const submitStats = user.submitStats?.acSubmissionNum || [];
    const allQuestions = data.data.allQuestionsCount || [];

    const getCount = (diff) =>
      submitStats.find((s) => s.difficulty.toLowerCase() === diff.toLowerCase())?.count || 0;
    const getTotal = (diff) =>
      allQuestions.find((q) => q.difficulty.toLowerCase() === diff.toLowerCase())?.count || 0;

    let submissionCalendar = {};
    try {
      if (user.userCalendar?.submissionCalendar) {
        submissionCalendar = JSON.parse(user.userCalendar.submissionCalendar);
      }
    } catch (e) {
      submissionCalendar = {};
    }

    const result = {
      username: user.username,
      totalSolved: getCount("All"),
      easySolved: getCount("Easy"),
      mediumSolved: getCount("Medium"),
      hardSolved: getCount("Hard"),
      totalQuestions: getTotal("All") || 4041,
      easyTotal: getTotal("Easy") || 962,
      mediumTotal: getTotal("Medium") || 2109,
      hardTotal: getTotal("Hard") || 970,
      ranking: user.profile?.ranking || 0,
      submissionCalendar
    };

    // Cache response for 10 minutes on edge / CDN
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");
    return res.status(200).json(result);
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Failed to fetch from LeetCode", message: error.message });
  }
}
