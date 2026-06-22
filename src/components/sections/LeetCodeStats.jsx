import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCode, FiActivity, FiStar, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import { format, fromUnixTime, subYears } from 'date-fns';
import 'react-calendar-heatmap/dist/styles.css';

import { useLeetCode } from '../../hooks/useLeetCode';
import { useTheme } from '../../context/ThemeContext';
import { FadeIn } from '../ui/FadeIn';
import { Skeleton } from '../ui/Skeleton';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { CircularProgress } from '../ui/CircularProgress';
import { TiltCard } from '../ui/TiltCard';

export const LeetCodeStats = () => {
  const { profile, solved, contest, calendar, recent, badges, isLoading, isError, username } = useLeetCode();
  const { theme } = useTheme();

  // Process Calendar Data & Calculate Streaks
  const { heatmapValues, currentStreak, maxStreak } = useMemo(() => {
    if (!calendar) return { heatmapValues: [], currentStreak: 0, maxStreak: 0 };
    
    let parsedCalendar = calendar;
    if (typeof calendar === 'string') {
      try { parsedCalendar = JSON.parse(calendar); } catch { parsedCalendar = {}; }
    } else if (calendar.submissionCalendar) {
      try { parsedCalendar = JSON.parse(calendar.submissionCalendar); } catch { parsedCalendar = {}; }
    }

    const values = [];
    const dates = Object.keys(parsedCalendar).map(Number).sort((a, b) => b - a); // descending
    let currS = 0;
    let maxS = 0;
    let tempMax;

    // Calculate streaks from sorted timestamps
    if (dates.length > 0) {
      // eslint-disable-next-line react-hooks/purity
      const today = Math.floor(Date.now() / 1000);
      const secondsInDay = 86400;
      let lastDate = dates[0];
      
      // Current streak check
      if (today - lastDate < secondsInDay * 2) {
        currS = 1;
        for (let i = 1; i < dates.length; i++) {
          if (dates[i - 1] - dates[i] <= secondsInDay + 3600) {
            currS++;
          } else break;
        }
      }

      // Max streak calculation
      tempMax = 1;
      maxS = 1;
      for (let i = 1; i < dates.length; i++) {
        if (dates[i - 1] - dates[i] <= secondsInDay + 3600) {
          tempMax++;
          if (tempMax > maxS) maxS = tempMax;
        } else {
          tempMax = 1;
        }
      }
    }

    Object.entries(parsedCalendar).forEach(([timestamp, count]) => {
      values.push({
        date: format(fromUnixTime(Number(timestamp)), 'yyyy-MM-dd'),
        count: count,
      });
    });

    return { heatmapValues: values, currentStreak: currS, maxStreak: maxS };
  }, [calendar]);

  if (isError) {
    return (
      <section className="space-y-8 scroll-mt-24">
        <div className="text-center py-12 glass-panel rounded-3xl">
          <FiActivity className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--color-text)]">Failed to load LeetCode data</h3>
          <p className="text-[var(--text-muted)] text-sm">Please try again later or check API availability.</p>
        </div>
      </section>
    );
  }

  const startDate = subYears(new Date(), 1);
  const endDate = new Date();

  return (
    <section id="leetcode" className="space-y-12 scroll-mt-24">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            LeetCode <span className="text-gradient-cyan">Activity</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Algorithmic problem-solving metrics and consistency heatmap.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <FadeIn delay={0.1} className="lg:col-span-1 flex">
          <TiltCard className="p-8 w-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-md opacity-50 animate-pulse" />
                  {isLoading ? (
                    <Skeleton variant="circular" className="w-20 h-20 relative z-10" />
                  ) : (
                    <img 
                      src={profile?.avatar || `https://ui-avatars.com/api/?name=${username}`} 
                      alt="LeetCode Avatar" 
                      className="w-20 h-20 rounded-full relative z-10 border-2 border-[var(--card-border)] object-cover bg-[var(--card-bg)]"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text)]">{profile?.name || username}</h3>
                  <a 
                    href={`https://leetcode.com/u/${username}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    @{username} <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-xl border-[var(--card-border)] bg-[var(--color-text)]/5 text-center">
                  <div className="text-xs text-[var(--text-muted)] font-semibold uppercase mb-1">Global Rank</div>
                  <div className="text-lg font-bold text-[var(--color-text)]">
                    {isLoading ? <Skeleton className="w-16 h-6 mx-auto" /> : <AnimatedCounter value={profile?.ranking || 0} />}
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl border-[var(--card-border)] bg-[var(--color-text)]/5 text-center">
                  <div className="text-xs text-[var(--text-muted)] font-semibold uppercase mb-1">Badges</div>
                  <div className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1">
                    <FiStar className="w-4 h-4 fill-amber-400" />
                    {isLoading ? <Skeleton className="w-8 h-6" /> : <AnimatedCounter value={badges} />}
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl border-[var(--card-border)] bg-[var(--color-text)]/5 text-center">
                  <div className="text-xs text-[var(--text-muted)] font-semibold uppercase mb-1">Curr Streak</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {isLoading ? <Skeleton className="w-8 h-6 mx-auto" /> : <><AnimatedCounter value={currentStreak} /> <span className="text-sm">Days</span></>}
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl border-[var(--card-border)] bg-[var(--color-text)]/5 text-center">
                  <div className="text-xs text-[var(--text-muted)] font-semibold uppercase mb-1">Max Streak</div>
                  <div className="text-lg font-bold text-emerald-500">
                    {isLoading ? <Skeleton className="w-8 h-6 mx-auto" /> : <><AnimatedCounter value={maxStreak} /> <span className="text-sm">Days</span></>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
               <a 
                href={`https://leetcode.com/u/${username}/`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[var(--color-text)]/10 hover:bg-[var(--color-text)]/15 text-[var(--color-text)] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
               >
                 View Full Profile <FiExternalLink className="w-4 h-4" />
               </a>
            </div>
          </TiltCard>
        </FadeIn>

        {/* Stats Grid & Problem Distribution */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
            
            {/* Stats Breakdown */}
            <FadeIn delay={0.2} className="glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors h-full flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]">
                <div>
                  <div className="text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider">Total Solved</div>
                  <div className="text-4xl font-extrabold text-[var(--color-text)] mt-1">
                    {isLoading ? <Skeleton className="w-24 h-10" /> : <AnimatedCounter value={solved?.solvedProblem || 0} />}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FiCode className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-400">Easy</span>
                  <span className="font-bold text-[var(--color-text)]">
                    {isLoading ? <Skeleton className="w-12 h-5" /> : <AnimatedCounter value={solved?.easySolved || 0} />}
                  </span>
                </div>
                <div className="w-full bg-[var(--color-text)]/5 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((solved?.easySolved || 0) / (solved?.solvedProblem || 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-cyan-400 h-2 rounded-full" 
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-amber-500">Medium</span>
                  <span className="font-bold text-[var(--color-text)]">
                    {isLoading ? <Skeleton className="w-12 h-5" /> : <AnimatedCounter value={solved?.mediumSolved || 0} />}
                  </span>
                </div>
                <div className="w-full bg-[var(--color-text)]/5 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((solved?.mediumSolved || 0) / (solved?.solvedProblem || 1)) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    className="bg-amber-500 h-2 rounded-full" 
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-rose-500">Hard</span>
                  <span className="font-bold text-[var(--color-text)]">
                    {isLoading ? <Skeleton className="w-12 h-5" /> : <AnimatedCounter value={solved?.hardSolved || 0} />}
                  </span>
                </div>
                <div className="w-full bg-[var(--color-text)]/5 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((solved?.hardSolved || 0) / (solved?.solvedProblem || 1)) * 100}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                    className="bg-rose-500 h-2 rounded-full" 
                  />
                </div>
              </div>
            </FadeIn>

            {/* Circular Progress Distribution */}
            <FadeIn delay={0.3} className="glass-panel rounded-3xl p-6 sm:p-8 flex items-center justify-center border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors h-full">
              {isLoading ? (
                <Skeleton variant="circular" className="w-48 h-48" />
              ) : (
                <CircularProgress 
                  easy={solved?.easySolved || 0} 
                  medium={solved?.mediumSolved || 0} 
                  hard={solved?.hardSolved || 0} 
                />
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Heatmap & Contests */}
        <div className="lg:col-span-2 space-y-8 flex flex-col justify-between">
          
          {/* Heatmap Section */}
          <FadeIn delay={0.4} className="glass-panel p-6 sm:p-8 rounded-3xl overflow-hidden border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
              <FiActivity className="w-5 h-5 text-cyan-400" />
              Submission Heatmap
            </h3>
            {isLoading ? (
              <Skeleton className="w-full h-32" />
            ) : (
              <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="min-w-max heatmap-container" data-theme={theme}>
                  <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={heatmapValues}
                    classForValue={(value) => {
                      if (!value || value.count === 0) return 'color-empty';
                      if (value.count < 3) return 'color-scale-1';
                      if (value.count < 6) return 'color-scale-2';
                      if (value.count < 10) return 'color-scale-3';
                      return 'color-scale-4';
                    }}
                    tooltipDataAttrs={(value) => {
                      return {
                        'data-tooltip-id': 'heatmap-tooltip',
                        'data-tooltip-content': value.date ? `${value.count} submissions on ${value.date}` : 'No submissions',
                      };
                    }}
                    showWeekdayLabels={true}
                  />
                  <Tooltip id="heatmap-tooltip" className="!bg-[var(--bg-color)] !text-[var(--color-text)] !opacity-100 !border !border-[var(--card-border)] !shadow-xl !rounded-lg !text-xs !font-semibold !px-3 !py-2" />
                </div>
              </div>
            )}
          </FadeIn>

          {/* Contest Stats */}
          <FadeIn delay={0.5} className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
              <FiTrendingUp className="w-5 h-5 text-purple-400" />
              Contest Statistics
            </h3>
            {isLoading ? (
              <Skeleton className="w-full h-20" />
            ) : contest?.contestAttend === 0 ? (
               <div className="py-4 text-center text-[var(--text-muted)] text-sm font-medium">
                 No contest data available yet.
               </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[var(--color-text)]/5 rounded-xl p-4 border border-[var(--color-text)]/10 text-center">
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">Rating</div>
                  <div className="text-xl font-bold text-[var(--color-text)]">
                    <AnimatedCounter value={Math.round(contest?.contestRating || 0)} />
                  </div>
                </div>
                <div className="bg-[var(--color-text)]/5 rounded-xl p-4 border border-[var(--color-text)]/10 text-center">
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">Global Rank</div>
                  <div className="text-xl font-bold text-[var(--color-text)]">
                    <AnimatedCounter value={contest?.contestGlobalRanking || 0} />
                  </div>
                </div>
                <div className="bg-[var(--color-text)]/5 rounded-xl p-4 border border-[var(--color-text)]/10 text-center">
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">Attended</div>
                  <div className="text-xl font-bold text-[var(--color-text)]">
                    <AnimatedCounter value={contest?.contestAttend || 0} />
                  </div>
                </div>
                <div className="bg-[var(--color-text)]/5 rounded-xl p-4 border border-[var(--color-text)]/10 text-center">
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">Top %</div>
                  <div className="text-xl font-bold text-[var(--color-text)]">
                    <AnimatedCounter value={contest?.contestTopPercentage || 0} decimals={2} suffix="%" />
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>

        {/* Recent Activity List */}
        <FadeIn delay={0.6} className="lg:col-span-1 glass-panel p-6 sm:p-8 rounded-3xl h-auto min-h-[600px] flex flex-col border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors">
          <h3 className="text-lg font-bold text-[var(--color-text)] mb-6 flex items-center gap-2 shrink-0">
            <FiCheckCircle className="w-5 h-5 text-emerald-400" />
            Recent Activity
          </h3>
          <div className="flex-1 space-y-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="w-full h-16" />)
            ) : recent?.length === 0 ? (
              <div className="text-center text-[var(--text-muted)] text-sm mt-10">No recent activity.</div>
            ) : (
              recent?.slice(0, 10).map((sub, idx) => (
                <a 
                  key={idx}
                  href={`https://leetcode.com/problems/${sub.titleSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-[var(--color-text)]/5 hover:bg-[var(--color-text)]/10 border border-[var(--color-text)]/10 p-3.5 rounded-xl transition-colors group cursor-pointer no-underline"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-[var(--color-text)] group-hover:text-cyan-400 transition-colors line-clamp-1">{sub.title}</h4>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold whitespace-nowrap ml-2">
                      {format(fromUnixTime(Number(sub.timestamp)), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sub.statusDisplay === 'Accepted' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {sub.statusDisplay}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
                      {sub.lang}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
