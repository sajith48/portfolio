import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LayoutWrapper } from './components/layout/LayoutWrapper';

import { Hero } from './components/sections/Hero';
import { TerminalAbout } from './components/sections/TerminalAbout';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Certifications } from './components/sections/Certifications';
import { GitHubStats } from './components/sections/GitHubStats';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <>
      <LayoutWrapper>
        <Hero />
        <TerminalAbout />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <GitHubStats />
        <Contact />
      </LayoutWrapper>
      <Analytics />
    </>
  );
}

export default App;
