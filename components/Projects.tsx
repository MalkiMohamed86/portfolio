export default function Projects() {
  const projects = [
    {
      title: "Halcyon Theme",
      description: "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
      tech: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
      github: "https://github.com",
      external: "https://demo.com",
    },
    {
      title: "Spotify Profile",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
      tech: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
      github: "https://github.com",
      external: "https://demo.com",
    },
    {
      title: "Build a Spotify Connected App",
      description: "Video course that teaches how to build a web app with the Spotify Web API. Topics covered include REST APIs, user auth flows, Node, Express, React, and more.",
      tech: ["React", "Express", "Spotify API", "Styled Components"],
      github: "https://github.com",
      external: "https://demo.com",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold text-white">Some Things I&apos;ve Built</h2>
          <div className="flex-1 h-px bg-white/[0.06]"></div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`relative grid md:grid-cols-12 gap-4 items-center ${idx % 2 === 1 ? 'md:text-right' : ''}`}
            >
              {/* Project Image Placeholder */}
              <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <a href={project.external} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative overflow-hidden rounded-lg bg-green-500/[0.05] aspect-video border border-white/[0.06]">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent group-hover:from-green-500/[0.06] transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-green-500/30 group-hover:text-green-500/50 transition-colors">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
              
              {/* Project Content */}
              <div className={`md:col-span-6 md:absolute ${idx % 2 === 1 ? 'md:left-0' : 'md:right-0'} z-10`}>
                <p className="text-green-400 text-sm font-medium mb-2 font-mono">Featured Project</p>
                <h3 className="text-xl font-bold text-white mb-4">
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                    {project.title}
                  </a>
                </h3>
                
                <div className="bg-[#111] rounded-lg p-6 shadow-lg mb-4 border border-white/[0.06]">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <ul className={`flex flex-wrap gap-3 text-xs text-slate-500 font-mono mb-4 ${idx % 2 === 1 ? 'md:justify-start' : 'md:justify-end'}`}>
                  {project.tech.map((tech, techIdx) => (
                    <li key={techIdx}>{tech}</li>
                  ))}
                </ul>
                
                <div className={`flex gap-4 ${idx % 2 === 1 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
