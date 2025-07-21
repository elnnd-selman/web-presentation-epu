"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 100;
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + increment;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{Math.floor(count)}{suffix}</span>;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'overview', 'tech', 'phases', 'models', 'security'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-white font-bold text-2xl">EPU Project</span>
                <div className="text-blue-400 text-sm">Technical Presentation</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', color: 'blue' },
                { id: 'tech', label: 'Technology', color: 'purple' },
                { id: 'phases', label: 'Development', color: 'green' },
                { id: 'models', label: 'Database', color: 'yellow' }
              ].map(({ id, label, color }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-white/80 hover:text-${color}-400 transition duration-300 relative group`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-${color}-400 transition-all group-hover:w-full`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 flex items-center justify-center relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        
        <main className="text-center z-10 px-6 max-w-6xl mx-auto">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold text-sm">
              🚀 In Development - 92% Complete
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              EPU
            </span>
            <br />
            <span className="text-white">Website</span>
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Enterprise University Portal
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Modern full-stack application with{' '}
            <code className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-mono">NestJS Backend</code>,{' '}
            <code className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono">Next.js Frontend</code>, and{' '}
            <code className="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono">MySQL Database</code>
          </p>
          
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {['NestJS 10', 'Next.js 14', 'Prisma ORM', 'MySQL 8', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="text-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                <Counter target={92} suffix="% Complete" />
              </span>
            </div>
            <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full w-[92%] transition-all duration-1000"></div>
            </div>
            <div className="text-white/60 mt-2 text-sm">Frontend UI ✅ | Backend APIs ✅ | Integration 🔄</div>
          </div>
          
          {/* Get Started Commands */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <h3 className="text-2xl font-bold text-white mb-6">🚀 Quick Start Commands</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Next.js Frontend</h4>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                  <div className="flex items-center mb-2">
                    <span className="text-red-400">$ </span>
                    <span>npx create-next-app@14 epu-frontend --typescript --tailwind --app</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400">$ </span>
                    <span>cd epu-frontend</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-400">$ </span>
                    <span>npm run dev</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">NestJS Backend</h4>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                  <div className="flex items-center mb-2">
                    <span className="text-red-400">$ </span>
                    <span>npm i -g @nestjs/cli</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400">$ </span>
                    <span>nest new epu-backend</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-400">$ </span>
                    <span>npm install prisma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '1.8s' }}>
            <button
              onClick={() => scrollToSection('overview')}
              className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">View Project Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-300 rounded-full"></div>
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20"
            >
              Technology Stack
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: 107, label: 'Database Models' },
              { value: 300, label: 'Relationships', suffix: '+' },
              { value: 85, label: 'Backend Complete', suffix: '%' },
              { value: 1-3, label: 'Weeks to Launch' }
            ].map(({ value, label, suffix = '' }, index) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-white/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-32 bg-gradient-to-b from-black/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Project <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Overview</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              A comprehensive university management system with advanced features, 
              modern architecture, and enterprise-grade security
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: '✅',
                title: 'Frontend Complete',
                status: 'Complete',
                statusColor: 'green',
                description: 'Next.js 14 with App Router, fully responsive design built with Tailwind CSS',
                features: ['Responsive design system', 'Multi-language support (EN/KU/AR)', 'Dark/Light theme modes', 'Accessibility compliant']
              },
              {
                icon: '⚡',
                title: 'Backend Architecture',
                status: '85% Complete',
                statusColor: 'green',
                description: 'NestJS backend with Prisma ORM, comprehensive API coverage',
                features: ['107 database models designed', 'JWT authentication & RBAC', 'Rate limiting & security', 'Students & news feed APIs remaining']
              },
              {
                icon: '🔄',
                title: 'Integration Phase',
                status: 'In Progress',
                statusColor: 'yellow',
                description: 'Connecting frontend to backend APIs, building admin dashboard',
                features: ['Admin panel integration', 'API connection layers', 'Final endpoint completion', 'QA testing & deployment']
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <span className={`absolute top-0 right-0 px-4 py-2 rounded-full text-sm font-medium ${
                    item.statusColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 mb-6">{item.description}</p>
                <ul className="space-y-2 text-white/60">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-32 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Technology <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge technologies carefully selected for performance, scalability, and developer experience
            </p>
          </div>
          
          {/* Tech Categories */}
          {[
            {
              title: '🎨 Frontend Technologies',
              techs: [
                { name: 'Next.js 14', desc: 'React framework with App Router, SSR & ISR', color: 'blue', cmd: 'npx create-next-app@14' },
                { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', color: 'cyan', cmd: 'npm install tailwindcss' },
                { name: 'TypeScript', desc: 'Type-safe JavaScript', color: 'purple', cmd: '--typescript' },
                { name: 'ShadCN/UI', desc: 'Beautiful component library', color: 'green', cmd: 'npx shadcn-ui@latest' }
              ]
            },
            {
              title: '⚡ Backend Technologies',
              techs: [
                { name: 'NestJS 10', desc: 'Enterprise Node.js framework', color: 'red', cmd: 'nest new project' },
                { name: 'Prisma ORM', desc: 'Type-safe database toolkit', color: 'indigo', cmd: 'npm install prisma' },
                { name: 'MySQL 8', desc: 'Relational database', color: 'orange', cmd: 'mysql://localhost:3306' },
                { name: 'JWT Auth', desc: 'Secure authentication', color: 'pink', cmd: '@nestjs/jwt' }
              ]
            }
          ].map((category, categoryIndex) => (
            <div key={category.title} className="mb-20">
              <h3 className="text-3xl font-bold text-white mb-12 text-center">{category.title}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.techs.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-${tech.color}-400 to-${tech.color}-600 rounded-2xl flex items-center justify-center shadow-lg shadow-${tech.color}-500/25 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-2xl">
                        {tech.name.includes('Next') ? '⚛️' : 
                         tech.name.includes('Tailwind') ? '🎨' : 
                         tech.name.includes('TypeScript') ? 'TS' : 
                         tech.name.includes('ShadCN') ? '🧩' :
                         tech.name.includes('NestJS') ? '🐱' :
                         tech.name.includes('Prisma') ? '🔺' :
                         tech.name.includes('MySQL') ? '🐬' : '🔐'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{tech.name}</h4>
                    <p className="text-white/70 text-sm mb-4">{tech.desc}</p>
                    <code className={`text-xs text-${tech.color}-400 bg-black/50 px-2 py-1 rounded`}>
                      {tech.cmd}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Phases */}
      <section id="phases" className="py-32 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Development <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Phases</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Strategic two-phase approach with Phase 1 being the most challenging foundation work
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {[
              {
                phase: '1',
                title: 'Phase 1 - Foundation',
                status: '✅ COMPLETED',
                statusColor: 'green',
                progress: 100,
                difficulty: '🔥 The Hardest Phase',
                description: 'Backend & Database Architecture',
                tasks: [
                  { name: 'Database Schema Design', done: true },
                  { name: '107 Models & Relationships', done: true },
                  { name: 'Multi-language Support', done: true },
                  { name: 'RBAC Security System', done: true },
                  { name: 'NestJS API Development', done: true }
                ],
                challenges: [
                  'Complex circular relationships between 107 models',
                  'Triple language fields (EN/KU/AR) for every text column',
                  'Advanced RBAC with scoped permissions',
                  'Custom slug generation and validation logic'
                ]
              },
              {
                phase: '2',
                title: 'Phase 2 - Integration',
                status: '🔄 IN PROGRESS',
                statusColor: 'yellow',
                progress: 75,
                difficulty: '🚀 Frontend Connection & Final Polish',
                description: 'UI Integration & Admin Panel',
                tasks: [
                  { name: 'Website UI Development', done: true },
                  { name: 'Admin Panel Integration', done: false },
                  { name: 'API Connection Layer', done: false },
                  { name: 'Students API Endpoints', done: false },
                  { name: 'News Feed & Home Widgets', done: false }
                ],
                timeline: '🎯 Target Completion: 1-3 Weeks'
              }
            ].map((phase, index) => (
              <div
                key={phase.phase}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${index === 0 ? 'from-red-500 to-pink-500' : 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-${index === 0 ? 'red' : 'blue'}-500/25`}>
                    <span className="text-white font-bold text-2xl">{phase.phase}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{phase.title}</h3>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      phase.statusColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Overall Progress</span>
                    <span className={`font-bold ${phase.statusColor === 'green' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {phase.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full ${phase.statusColor === 'green' ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-white/80 font-medium text-lg">{phase.difficulty}</p>
                  
                  <div className="space-y-4">
                    {phase.tasks.map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                        <span className="text-white">{task.name}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.done ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {task.done ? '✅' : '🔄'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {phase.challenges && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                      <h4 className="text-red-400 font-semibold mb-2">💪 Why This Was The Hardest:</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        {phase.challenges.map((challenge, i) => (
                          <li key={i}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {phase.timeline && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                      <h4 className="text-blue-400 font-semibold mb-2">{phase.timeline}</h4>
                      <p className="text-white/60 text-sm">Much easier phase focused on UI connections and final API endpoints</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Models */}
      <section id="models" className="py-32 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Database <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Architecture</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Comprehensive data model covering all university operations with complex relationships and multi-language support
            </p>
          </div>
          
          {/* Database Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              { value: 107, label: 'Database Models' },
              { value: 300, label: 'Relationships', suffix: '+' },
              { value: 7, label: 'Enum Types' },
              { value: 3, label: 'Languages' }
            ].map(({ value, label, suffix = '' }) => (
              <div key={label} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-white/80 text-lg">{label}</div>
              </div>
            ))}
          </div>
          
          {/* Model Categories */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Security & Auth',
                icon: '🔐',
                color: 'red',
                models: [
                  { name: 'User', desc: 'Master account record with roles & permissions' },
                  { name: 'EmailVerification', desc: 'OTP verification for email confirmation' },
                  { name: 'Role & Permission', desc: 'RBAC system with fine-grained access' },
                  { name: 'Token', desc: 'JWT access & refresh token storage' }
                ]
              },
              {
                title: 'Organization',
                icon: '🏢',
                color: 'blue',
                models: [
                  { name: 'Center', desc: 'Research & service centers' },
                  { name: 'College', desc: 'Academic colleges with departments' },
                  { name: 'Department', desc: 'Academic departments & programs' },
                  { name: 'Directorate', desc: 'Administrative directorates' }
                ]
              },
              {
                title: 'Teachers & CV',
                icon: '👨‍🏫',
                color: 'green',
                models: [
                  { name: 'Teacher', desc: 'Primary lecturer profile & bio' },
                  { name: 'TeacherQualification', desc: 'Degrees & academic credentials' },
                  { name: 'TeacherResearch', desc: 'Published research & papers' },
                  { name: 'SupervisingResearch', desc: 'Student supervision records' }
                ]
              },
              {
                title: 'Content Hub',
                icon: '📰',
                color: 'purple',
                models: [
                  { name: 'News', desc: 'Multilingual news articles' },
                  { name: 'Event', desc: 'Public events & schedules' },
                  { name: 'NewsCategory', desc: 'Color-coded categorization' },
                  { name: 'Image & File', desc: 'Media management system' }
                ]
              },
              {
                title: 'Academics',
                icon: '📚',
                color: 'yellow',
                models: [
                  { name: 'CourseSubject', desc: 'Individual course subjects' },
                  { name: 'CourseCurriculum', desc: 'Complete degree programs' },
                  { name: 'AssessmentScheme', desc: 'Grading & evaluation methods' },
                  { name: 'PDFLecture', desc: 'Course materials & lectures' }
                ]
              },
              {
                title: 'Laboratory',
                icon: '🧪',
                color: 'indigo',
                models: [
                  { name: 'Laboratory', desc: 'Lab facilities & equipment' },
                  { name: 'LaboratorySection', desc: 'Lab sections & specializations' },
                  { name: 'LaboratoryImage', desc: 'Visual documentation' },
                  { name: 'LaboratoryDepartment', desc: 'Department associations' }
                ]
              }
            ].map((category, index) => (
              <div
                key={category.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-${category.color}-500/25`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.models.map((model, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <div className="font-medium text-white">{model.name}</div>
                      <div className="text-white/60 text-sm">{model.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Security & <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Protection</span>
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Enterprise-grade security measures implemented throughout the entire system
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentication',
                icon: '🔐',
                color: 'red',
                features: ['JWT access + refresh tokens', 'HTTP-only secure cookies', 'Email verification flows', 'Password reset with OTP', 'Device-scoped sessions']
              },
              {
                title: 'Authorization',
                icon: '👥',
                color: 'blue',
                features: ['Role-based access control (RBAC)', 'Fine-grained permissions', 'Scoped admin roles', 'User permission overrides', 'Dynamic guard system']
              },
              {
                title: 'Data Protection',
                icon: '🛡️',
                color: 'green',
                features: ['HTTPS + HSTS enforcement', 'Input validation & sanitization', 'SQL injection prevention', 'XSS protection headers', 'CSRF token validation']
              },
              {
                title: 'Rate Limiting',
                icon: '⚡',
                color: 'yellow',
                features: ['Redis-backed throttling', 'IP-based restrictions', 'API endpoint limits', 'DDoS protection via Cloudflare', 'Automatic IP banning']
              },
              {
                title: 'File Security',
                icon: '📁',
                color: 'purple',
                features: ['ClamAV virus scanning', 'MIME type validation', 'File size restrictions', 'Secure randomized paths', 'Magic byte verification']
              },
              {
                title: 'Monitoring',
                icon: '📊',
                color: 'pink',
                features: ['Grafana dashboards', 'Centralized logging (Loki)', 'Real-time error tracking', 'Performance metrics', 'Slack alert integration']
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${item.color}-500/25`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-3 text-white/70">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className={`w-2 h-2 bg-${item.color}-400 rounded-full mr-3`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center z-10 relative">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Ready for <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Launch</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Comprehensive university management system built with modern technologies, 
            enterprise security, and scalable architecture
          </p>
          
          {/* Launch Timeline */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">🚀 Launch Timeline</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-500/20 rounded-xl p-4">
                <div className="text-green-400 font-semibold mb-2">✅ Phase 1 Complete</div>
                <div className="text-white/80 text-sm">Backend architecture & database design finished</div>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4">
                <div className="text-yellow-400 font-semibold mb-2">🔄 Phase 2 Active</div>
                <div className="text-white/80 text-sm">Frontend integration & admin panel development</div>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4">
                <div className="text-blue-400 font-semibold mb-2">🎯 1-3 Weeks</div>
                <div className="text-white/80 text-sm">Production deployment & go-live</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-white mb-4">🎉 EPU Website Project</p>
            <p className="text-white/70 text-lg mb-8">Modern • Secure • Scalable • Multi-lingual</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['NestJS 10', 'Next.js 14', 'Prisma ORM', 'MySQL 8', 'TypeScript', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div className="text-2xl font-bold text-white">EPU Website Project</div>
          </div>
          
          <p className="text-center text-white/60 mb-8 text-lg">
            Enterprise University Portal - Built with passion for education technology
          </p>
          
          
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { name: 'NestJS Backend', color: 'blue' },
              { name: 'Next.js Frontend', color: 'purple' },
              { name: 'MySQL Database', color: 'green' },
              { name: 'Enterprise Security', color: 'red' }
            ].map(({ name, color }) => (
              <span
                key={name}
                className={`bg-gradient-to-r from-${color}-500 to-${color}-600 px-4 py-2 rounded-full text-white text-sm font-medium`}
              >
                {name}
              </span>
            ))}
          </div>
          
          <div className="text-center text-white/40 text-sm">
            <p>&copy; 2025 Erbil Polytechnic University. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}