import { motion } from "framer-motion";
import { ExternalLink, Trophy, Target, Zap, Flame } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { LeetCodeChart } from "./LeetCodeChart";

// Lazy load the activity heatmap for performance
const ActivityHeatmap = lazy(() =>
  import("./LeetCodeHeatmap").then((m) => ({ default: m.LeetCodeHeatmap }))
);

const DEFAULT_REAL_STATS = {
  username: "hemang47",
  totalSolved: 214,
  easySolved: 164,
  mediumSolved: 50,
  hardSolved: 0,
  totalQuestions: 4041,
  easyTotal: 962,
  mediumTotal: 2109,
  hardTotal: 970,
  ranking: 777819,
  submissionCalendar: {
    "1767571200": 4, "1770076800": 3, "1771891200": 2, "1772150400": 1,
    "1773100800": 1, "1773273600": 2, "1773360000": 5, "1773446400": 3,
    "1773619200": 1, "1773705600": 1, "1774396800": 1, "1774483200": 2,
    "1774569600": 1, "1774828800": 1, "1774915200": 1, "1775001600": 1,
    "1775260800": 1, "1775347200": 1, "1775520000": 2, "1775692800": 3,
    "1775779200": 2, "1775865600": 1, "1776038400": 2, "1776124800": 2,
    "1776988800": 4, "1777939200": 2, "1778112000": 3, "1778198400": 3,
    "1778284800": 3, "1778371200": 3, "1778457600": 1, "1778976000": 11,
    "1779494400": 13, "1779926400": 10, "1780185600": 1, "1780358400": 3,
    "1780444800": 4, "1780531200": 3, "1780617600": 3, "1780876800": 3,
    "1780963200": 2, "1781481600": 3, "1781740800": 2, "1781827200": 6,
    "1782086400": 10, "1782172800": 5, "1782259200": 1, "1782345600": 1,
    "1782864000": 21, "1782950400": 7, "1783036800": 5, "1783123200": 2,
    "1783209600": 16, "1783296000": 11, "1783814400": 1, "1783987200": 1,
    "1784160000": 3, "1784246400": 5, "1784592000": 2, "1784678400": 1,
    "1785110400": 1, "1785196800": 6, "1785283200": 1, "1785456000": 1,
    "1785542400": 6, "1785715200": 1, "1785801600": 9, "1785888000": 1,
    "1785974400": 2, "1786060800": 1, "1786320000": 7, "1786406400": 1,
    "1786492800": 5, "1786579200": 3, "1786665600": 1, "1786838400": 1,
    "1786924800": 9, "1787011200": 2, "1787097600": 1, "1787184000": 3,
    "1787270400": 1, "1787443200": 1, "1787529600": 2, "1787616000": 2,
    "1787702400": 1, "1787875200": 2
  }
};

function StatCard({ label, value, total, color, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" style={{ color }} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-display" style={{ color }}>
          {value}
        </span>
        {total && <span className="text-sm text-muted-foreground">/ {total}</span>}
      </div>
    </motion.div>
  );
}

function StatsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card/50 rounded-xl p-4 border border-border">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
      <div className="bg-card/50 rounded-xl p-6 border border-border">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

export function LeetCodeSection() {
  const [stats, setStats] = useState(() => {
    try {
      const cached = localStorage.getItem("leetcode_stats_cache");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_REAL_STATS;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Extract username from LeetCode URL
        const leetcodeUrl = socialLinks.leetcode;
        const username = leetcodeUrl.split("/u/")[1]?.replace("/", "") || "hemang47";

        const fetchWithTimeout = async (url, options = {}, ms = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), ms);
          try {
            const response = await fetch(url, {
              ...options,
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
          } catch (err) {
            clearTimeout(timeoutId);
            throw err;
          }
        };

        const fetchWithFallbacks = async () => {
          // Primary: Our dedicated backend / serverless endpoint (supports Vite dev + Vercel)
          try {
            const res = await fetchWithTimeout(`/api/leetcode?username=${username}`);
            if (res.ok) {
              const data = await res.json();
              if (data && data.totalSolved !== undefined) {
                return data;
              }
            }
          } catch (e) {
            console.warn("Internal LeetCode API endpoint failed:", e);
          }

          // Fallback 1: alfa-leetcode-api
          try {
            const [profileRes, solvedRes] = await Promise.all([
              fetchWithTimeout(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`),
              fetchWithTimeout(`https://alfa-leetcode-api.onrender.com/${username}/solved`)
            ]);

            if (profileRes.ok && solvedRes.ok) {
              const profile = await profileRes.json();
              const solved = await solvedRes.json();

              if (!profile.errors && !solved.errors) {
                return {
                  username: username,
                  totalSolved: solved.solvedProblem || 214,
                  easySolved: solved.easySolved || 164,
                  mediumSolved: solved.mediumSolved || 50,
                  hardSolved: solved.hardSolved || 0,
                  totalQuestions: 4041,
                  easyTotal: 962,
                  mediumTotal: 2109,
                  hardTotal: 970,
                  ranking: profile.ranking || 777819,
                  submissionCalendar: DEFAULT_REAL_STATS.submissionCalendar
                };
              }
            }
          } catch (e) {
            console.warn("Secondary LeetCode API failed:", e);
          }

          // Fallback 2: leetcode-stats-api
          try {
            const res = await fetchWithTimeout(`https://leetcode-stats-api.herokuapp.com/${username}`);
            if (res.ok) {
              const data = await res.json();
              if (data.status === "success") {
                return {
                  username: username,
                  totalSolved: data.totalSolved || 214,
                  easySolved: data.easySolved || 164,
                  mediumSolved: data.mediumSolved || 50,
                  hardSolved: data.hardSolved || 0,
                  totalQuestions: data.totalQuestions || 4041,
                  easyTotal: data.totalEasy || 962,
                  mediumTotal: data.totalMedium || 2109,
                  hardTotal: data.totalHard || 970,
                  ranking: data.ranking || 777819,
                  submissionCalendar:
                    data.submissionCalendar && Object.keys(data.submissionCalendar).length > 0
                      ? data.submissionCalendar
                      : DEFAULT_REAL_STATS.submissionCalendar
                };
              }
            }
          } catch (e) {
            console.warn("Tertiary LeetCode API failed:", e);
          }

          return DEFAULT_REAL_STATS;
        };

        const finalData = await fetchWithFallbacks();
        setStats(finalData);
        try {
          localStorage.setItem("leetcode_stats_cache", JSON.stringify(finalData));
        } catch (e) {
          // ignore
        }
      } catch (err) {
        console.error("Total failure in LeetCode section:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="leetcode" className="section-padding bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">LeetCode</span> Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practicing Data Structures & Algorithms
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
              {/* LeetCode-inspired background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FFA116] blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#1A1A1A] blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFA116] to-[#FF6B00] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FFA116]/20"
                >
                  <span className="text-3xl font-bold text-white font-display">LC</span>
                </motion.div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                    {stats?.username || "hemang47"}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">
                    Actively practicing Data Structures and Algorithms
                  </p>
                  {stats?.ranking && stats.ranking > 0 && (
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/50">
                      <Trophy className="h-4 w-4 text-[#FFA116]" />
                      <span>
                        Global Rank:{" "}
                        <strong className="text-foreground">
                          {stats.ranking.toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className="bg-[#FFA116] hover:bg-[#FF9100] text-white flex-shrink-0 shadow-md shadow-[#FFA116]/20"
                  asChild
                >
                  <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Profile
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          {loading ? (
            <StatsLoadingSkeleton />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card/50 rounded-xl p-6 border border-border text-center"
            >
              <p className="text-muted-foreground">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Visit the profile directly to see live statistics.
              </p>
            </motion.div>
          ) : stats ? (
            <>
              {/* Problem Solving Stats & Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-4 h-full content-start">
                  <StatCard
                    label="Total Solved"
                    value={stats.totalSolved}
                    total={stats.totalQuestions}
                    color="#FFA116"
                    icon={Target}
                    delay={0.1}
                  />
                  <StatCard
                    label="Easy"
                    value={stats.easySolved}
                    total={stats.easyTotal}
                    color="#00B8A3"
                    icon={Zap}
                    delay={0.2}
                  />
                  <StatCard
                    label="Medium"
                    value={stats.mediumSolved}
                    total={stats.mediumTotal}
                    color="#FFC01E"
                    icon={Flame}
                    delay={0.3}
                  />
                  <StatCard
                    label="Hard"
                    value={stats.hardSolved}
                    total={stats.hardTotal}
                    color="#EF4743"
                    icon={Trophy}
                    delay={0.4}
                  />
                </div>

                {/* Recharts Donut Pie Chart */}
                <div className="lg:col-span-1">
                  <LeetCodeChart
                    easy={stats.easySolved}
                    medium={stats.mediumSolved}
                    hard={stats.hardSolved}
                  />
                </div>
              </div>

              {/* Activity Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border"
              >
                <h4 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-[#FFA116]" />
                  Submission Activity
                </h4>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <ActivityHeatmap submissionCalendar={stats.submissionCalendar} />
                </Suspense>
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
