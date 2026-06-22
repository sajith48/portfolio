import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FadeIn } from '../ui/FadeIn';
import { useTheme } from '../../context/ThemeContext';

export const GitHubStats = () => {
  const { theme } = useTheme();

  return (
    <section id="github" className="space-y-12 scroll-mt-24">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            A visual overview of my coding activity and open-source contributions.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-panel p-6 md:p-8 rounded-3xl max-w-5xl mx-auto overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full overflow-x-auto pb-4 flex justify-center custom-scrollbar">
            <GitHubCalendar 
              username="sajith48" 
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              blockSize={14}
              blockMargin={4}
              fontSize={14}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              tooltips={{
                activity: {
                  text: (activity) => `${activity.count} contributions on ${activity.date}`,
                },
              }}
            />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
