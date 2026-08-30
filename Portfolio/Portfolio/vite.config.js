import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function leetcodeDevPlugin() {
  return {
    name: "leetcode-dev-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith("/api/leetcode")) {
          const url = new URL(req.url, "http://localhost");
          const username = url.searchParams.get("username") || "hemang47";

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

            if (gqlRes.ok) {
              const data = await gqlRes.json();
              if (data.data?.matchedUser) {
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

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result));
                return;
              }
            }
          } catch (err) {
            console.error("Vite LeetCode dev middleware error:", err);
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), leetcodeDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
