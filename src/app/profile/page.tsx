"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SuphakinProfile() {
  const [activeTab, setActiveTab] = useState('experience');
  
  // Profile data
  const profile = {
	name: "SUPHAKIN THIWONG",
	title: "Software Developer",
	location: "Bangkok, Thailand",
	email: "suphakin.th@gmail.com",
	gameUrl: "https://raspv.babylvoob.org/game",
	github: "https://github.com/suphakin-th",
	summary: "Experienced Backend Developer with 8+ years in software development, specializing in high-performance data processing systems and web application development. Strong expertise in Python/Django, PHP, and Rust with a track record of implementing secure, scalable solutions. Skilled in payment gateway integrations and cybersecurity best practices. Project management experience with proven ability to lead technical teams and a passion for IoT technologies. Seeking opportunities to leverage my technical expertise internationally.",
	yearsExperience: 8
  };

  const skills = {
	programming: [
	  { name: "Python", years: 7, level: 92 },
	  { name: "PHP", years: 6, level: 88 },
	  { name: "Rust", years: 2, level: 75 },
	  { name: "JavaScript", years: 4, level: 82 },
	  { name: "NodeJS", years: 3, level: 80 },
	  { name: "Go", years: 2, level: 72 },
	  { name: "C/C++", years: 3, level: 76 },
	  { name: "Shell Scripting", years: 5, level: 85 },
	  { name: "TypeScript", years: 3, level: 78 }
	],
	frameworks: [
	  { name: "Django", years: 6, level: 90 },
	  { name: "REST API", years: 5, level: 92 },
	  { name: "FastAPI", years: 2, level: 84 },
	  { name: "Flask", years: 3, level: 80 },
	  { name: "Express.js", years: 2, level: 78 },
	  { name: "Laravel", years: 3, level: 82 },
	  { name: "Actix Web (Rust)", years: 1, level: 70 },
	  { name: "NestJS", years: 2, level: 75 }
	],
	technologies: [
	  "Docker", "Kubernetes", "Git", "MQTT", "Google Firebase", "Blockchain (Solana)", 
	  "RabbitMQ", "Redis", "Prometheus", "Grafana", "Elasticsearch", "CI/CD Pipelines",
	  "WebSockets", "gRPC", "Message Queues", "Raspberry Pi", "Arduino"
	],
	cloud: [
	  "AWS", "Google Cloud Platform", "Azure", "Huawei Cloud", 
	  "DigitalOcean", "Vultr", "Cloudflare", "Oracle Cloud"
	],
	databases: [
	  "MariaDB", "MySQL", "PostgreSQL", "InfluxDB", "MongoDB", 
	  "Redis", "TimeScaleDB", "SQLite", "Cassandra"
	],
	devops: [
	  "Docker Swarm", "Kubernetes", "Terraform", "Ansible", "GitHub Actions",
	  "Jenkins", "Prometheus", "Grafana", "Traefik", "Nginx"
	],
	iot: [
	  "Raspberry Pi", "Arduino", "ESP32/ESP8266", "MQTT", "Zigbee", 
	  "Home Assistant", "Node-RED", "LoRaWAN", "Modbus", "OpenHAB"
	],
	security: [
	  "OWASP Security Practices", "Penetration Testing", "Secure Coding", "JWT Authentication",
	  "OAuth 2.0/OpenID Connect", "SSL/TLS Implementation", "WAF Configuration", 
	  "Security Auditing", "Vulnerability Assessment", "Snort/Suricata"
	],
	payment: [
	  "SCB Payment Gateway", "K-Bank Payment Gateway", "Stripe", "PayPal", 
	  "Omise", "2C2P", "QR Payment", "Promptpay Integration", "PCI DSS Compliance"
	]
  };

  const experiences = [
	{
	  title: "Backend Developer",
	  company: "ViaBus Thailand Co., Ltd",
	  period: "Current position (2 years)",
	  techStack: "PHP, RUST, SQL, R3, TSDB",
	  achievements: [
		"Built transportation tracking app processing 10GB+/minute with 40% throughput optimization",
		"Implemented R-tree database design for efficient geospatial data processing",
		"Deployed and maintained microservices architecture across multiple cloud platforms",
		"Optimized database queries resulting in 30% reduction in API response time"
	  ]
	},
	{
	  title: "Senior Backend Developer",
	  company: "Vekin Thailand Co.,Ltd",
	  period: "1 Years 4 months",
	  techStack: "TensorFlow, Django, OpenCV, RUST",
	  achievements: [
		"Developed EV-charger control app and Solana blockchain for carbon credit tracking",
		"Payment gateway with SCB and K-Bank",
		"Cyber security for authentication with hash token domain system",
		"Led 5-person team as Scrum Master; built ML models for carbon absorption metrics",
		"Created cryptocurrency payment gateway and smart contract exchange system",
		"Integrated IoT sensors with cloud infrastructure for real-time data processing"
	  ]
	},
	{
	  title: "Full-Stack Developer",
	  company: "Conicle Co.,Ltd.",
	  period: "2 Years 5 Months",
	  techStack: "Python, PHP, SQL, Django, REST, FastAPI, Flask, JS, NodeJS",
	  achievements: [
		"Architected HR e-learning platform with Django, increasing performance by 60%",
		"Implemented RESTful APIs and contributed to frontend development",
		"Payment gateway with SCB and K-Bank",
		"Cyber security for authentication with hash token domain system",
		"Designed and deployed containerized microservices using Docker and Kubernetes",
		"Built real-time analytics dashboard with WebSockets and Time-Series databases"
	  ]
	},
	{
	  title: "Payment Systems Developer",
	  company: "FinTech Solutions Co., Ltd.",
	  period: "2 Years 2 Months",
	  techStack: "Node.js, TypeScript, PostgreSQL, REST APIs, Security Frameworks",
	  achievements: [
		"Integrated SCB and K-Bank payment gateways for e-commerce platforms with 99.9% transaction success rate",
		"Implemented secure payment processing systems compliant with PCI DSS standards",
		"Developed automated reconciliation system reducing manual workload by 75%",
		"Created fraud detection algorithms that reduced fraudulent transactions by 40%"
	  ]
	},
	{
	  title: "Web Developer",
	  company: "Previous Roles",
	  period: "1 Year",
	  techStack: "PHP, JavaScript, MySQL, Laravel, jQuery",
	  achievements: [
		"Developed and maintained multiple client websites and web applications",
		"Implemented responsive designs and interactive UI components",
		"Created database schemas and optimized SQL queries for performance",
		"Integrated third-party APIs and payment gateways"
	  ]
	}
  ];

  const education = {
	university: "King Mongkut's University of Technology North Bangkok",
	degree: "Bachelor of Science, Faculty of Applied Sciences",
	major: "Mathematics and Computer Science",
	gpa: 3.13
  };

  const certifications = [
	"ISO/IEC 29110",
	"ISO/IEC 29112",
	"Kaggle: Master Level",
	"AWS Certified Solutions Architect - Associate",
	"Docker Certified Associate",
	"CompTIA Security+",
	"PCI DSS Compliance Implementation",
	"Skill4Life: Logical Reasoning, Structured problem solving, Understanding Biases, Seeking Relevant Information, Storytelling and Public Speaking"
  ];

  const competencies = [
	"High-Volume Data Processing",
	"Blockchain & Smart Contract Development",
	"Web Application Architecture",
	"Team Leadership & Scrum Management",
	"Machine Learning Implementation",
	"Security & Data Protection",
	"Cloud Infrastructure Design",
	"IoT System Integration",
	"Microservices Architecture",
	"Payment Gateway Integration",
	"Application Security Design",
	"Secure API Development"
  ];

  return (
	<>
	  {/* Add CSS within the component */}
	  <style jsx global>{`
		/* Custom styling for the abstract background effect */
		@keyframes slowFloat {
		  0% { transform: translate(0, 0) rotate(0deg); }
		  50% { transform: translate(5px, 5px) rotate(0.5deg); }
		  100% { transform: translate(0, 0) rotate(0deg); }
		}
		
		@keyframes colorPulse {
		  0% { opacity: 0.4; }
		  50% { opacity: 0.6; }
		  100% { opacity: 0.4; }
		}
		
		.abstract-bg-element {
		  animation: slowFloat 15s ease-in-out infinite, colorPulse 20s ease-in-out infinite;
		  filter: blur(80px);
		}
		/* Custom styles for progress components */
		:root {
		  --progress-dark: #1e293b;  /* dark slate blue/gray */
		  --progress-green: #10b981; /* green */
		}
		
		/* Target multiple possible implementations of the Progress component */
		/* Target the actual progress bar inside the Progress component */
		.progress-green [role="progressbar"] > div,
		.progress-green > div,
		.progress-green::after,
		.progress-green::-webkit-progress-value,
		.progress-green::-moz-progress-bar {
		  background: linear-gradient(to right, var(--progress-dark), var(--progress-green)) !important;
		}
		
		/* For shadcn/ui Progress component which might use data attributes */
		[data-progress-indicator] {
		  background: linear-gradient(to right, var(--progress-dark), var(--progress-green)) !important;
		}
		
		/* Modify CSS variables that might control the progress color */
		.progress-green {
		  --progress-fill: linear-gradient(to right, var(--progress-dark), var(--progress-green)) !important;
		  --progress-foreground: linear-gradient(to right, var(--progress-dark), var(--progress-green)) !important;
		}

		/* Game showcase styling */
        .game-card {
          background: linear-gradient(135deg, #1a1a1a, #232323);
          border: 2px solid #333;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .game-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
          border-color: #10b981;
        }
        
        .play-button {
          transition: all 0.3s ease;
          transform: translateY(0);
          opacity: 0.9;
        }
        
        .game-card:hover .play-button {
          transform: translateY(-5px) scale(1.05);
          opacity: 1;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
                }
          }
          70% {
            box-shadow: 0 0 0 15px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        
        .game-bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
	  
	  <main className="min-h-screen text-white relative overflow-hidden">
		{/* Background with overlay */}
		<div className="absolute inset-0 z-0">
		  <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a202c] to-[#0f172a] opacity-90"></div>
		  
		  {/* Abstract painted texture overlay */}
		  <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x1080')] bg-cover opacity-40 mix-blend-overlay"></div>
		  
		  {/* Colorful accent elements */}
		  <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-bl from-[#7f1d1d] via-[#4c1d95] to-transparent opacity-30 blur-xl abstract-bg-element"></div>
		  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0c4a6e] via-[#172554] to-transparent opacity-20 blur-xl abstract-bg-element"></div>
		  <div className="absolute top-1/4 left-1/6 w-1/4 h-1/3 bg-gradient-to-br from-[#5b21b6]/40 via-[#1e3a8a]/30 to-transparent opacity-20 blur-xl abstract-bg-element" style={{animationDelay: '2s'}}></div>
		  <div className="absolute bottom-1/4 right-1/6 w-1/5 h-1/4 bg-gradient-to-bl from-[#9f1239]/30 via-[#4338ca]/20 to-transparent opacity-20 blur-xl abstract-bg-element" style={{animationDelay: '5s'}}></div>
		</div>
		{/* Header Section */}
		<div className="bg-[#1E1E1E]/50 backdrop-blur-sm border-b border-gray-800/50 relative z-10">
		  <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center">
			<div className="flex flex-col md:flex-row items-center">
			  {/* Profile Image */}
			  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#333] mb-4 md:mb-0 md:mr-6">
				<img src="https://i.ibb.co/sdDSn299/Screenshot-2025-03-30-154309.png" />
			  </div>
			  
			  {/* Name and Contact */}
			  <div className="text-center md:text-left">
			  <h1 className="text-3xl font-bold text-green-400">{profile.name}</h1>
				<h2 className="text-xl text-gray-400">{profile.title}</h2>
				<div className="mt-2 flex flex-col md:flex-row items-center md:items-start text-sm text-gray-300">
				  <span className="mr-4 mb-1 md:mb-0"><span className="mr-1">&#x1F4CD;</span>{profile.location}</span>
				  <a href={`mailto:${profile.email}`} className="mr-4 text-blue-400 hover:text-blue-300 mb-1 md:mb-0">
					<span className="mr-1">&#9993;&#65039;</span>{profile.email}
				  </a>
				  <span className="font-medium text-emerald-400">{profile.yearsExperience}+ Years Experience</span>
				</div>
			  </div>
			</div>
			
			{/* GitHub Button */}
			<div className="mt-4 md:mt-0 md:ml-auto">
				<a 
				href={profile.github} 
				target="_blank" 
				rel="noopener noreferrer" 
				className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-green-400 px-4 py-2 rounded border border-gray-700"
				>
				GitHub Profile
				</a>
				<a>   </a>
				<a 
					href={profile.gameUrl} 
					target="_blank" 
					rel="noopener noreferrer" 
					className="bg-[#10b981] hover:bg-[#0d9668] text-white px-4 py-2 rounded border border-green-600 pulse-animation"
				>
					<span className="mr-2">🎮</span> Boring?
				</a>
			</div>
		  </div>
		</div>

		{/* Main Content */}
		<div className="container mx-auto px-6 py-8 relative z-10">
		  {/* Summary Card */}
		  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white mb-6 shadow-lg">
			<CardHeader>
			  <CardTitle className="text-green-400">Professional Summary</CardTitle>
			</CardHeader>
			<CardContent>
			  <p className="text-gray-300">{profile.summary}</p>
			</CardContent>
		  </Card>

		  {/* Custom Tabs Navigation */}
		  <div className="mb-6 flex border-b border-gray-800">
			{['experience', 'skills', 'education', 'competencies'].map((tab) => (
			  <button 
				key={tab}
				className={`px-4 py-2 font-medium text-sm transition-colors ${
				  activeTab === tab 
					? 'border-b-2 border-green-500 text-green-400' 
					: 'text-gray-400 hover:text-gray-300'
				}`}                
				onClick={() => setActiveTab(tab)}
			  >
				{tab.charAt(0).toUpperCase() + tab.slice(1)}
			  </button>
			))}
		  </div>

		  {/* Tabs Content */}
		  <div className="mb-6">
			{/* Experience Tab */}
			{activeTab === 'experience' && (
			  <div className="grid gap-6">
				{experiences.map((exp, index) => (
				  <Card key={index} className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
						<div>
						  <CardTitle>{exp.title}</CardTitle>
						  <p className="text-gray-400 mt-1">{exp.company}</p>
						</div>
						<span className="mt-2 md:mt-0 inline-flex items-center rounded-full border border-gray-700 px-2.5 py-0.5 text-xs font-semibold text-gray-300">
						  {exp.period}
						</span>
					  </div>
					</CardHeader>
					<CardContent className="space-y-4">
					  <div className="bg-[#252525] px-3 py-2 rounded text-blue-400 text-sm">
						Tech stack: {exp.techStack}
					  </div>
					  <div className="space-y-2">
						{exp.achievements.map((achievement, i) => (
						  <div key={i} className="flex items-start">
							<span className="text-green-400 mr-2">&#8226;</span>
							<span className="text-gray-300">{achievement}</span>
						  </div>
						))}
					  </div>
					</CardContent>
				  </Card>
				))}
			  </div>
			)}

			{/* Skills Tab */}
			{activeTab === 'skills' && (
			  <div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Programming Languages</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
					  {skills.programming.map((skill, index) => (
						<div key={index} className="space-y-1">
						  <div className="flex justify-between items-center text-sm">
							<span className="text-gray-300">
							  {skill.name} <span className="text-gray-500">({skill.years} {skill.years === 1 ? 'year' : 'years'})</span>
							</span>
							<span className="text-green-400">{skill.level}%</span>
						  </div>
						  <Progress 
							value={skill.level} 
							className="h-2 bg-[#252525] progress-green" 
						  />
						</div>
					  ))}
					</CardContent>
				  </Card>

				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Frameworks & Libraries</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
					  {skills.frameworks.map((framework, index) => (
						<div key={index} className="space-y-1">
						  <div className="flex justify-between items-center text-sm">
							<span className="text-gray-300">
							  {framework.name} {framework.years && <span className="text-gray-500">({framework.years} {framework.years === 1 ? 'year' : 'years'})</span>}
							</span>
							<span className="text-green-400">{framework.level}%</span>
						  </div>
						  <Progress 
							value={framework.level} 
							className="h-2 bg-[#252525] progress-green" 
						  />
						</div>
					  ))}
					</CardContent>
				  </Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Payment Gateway Integration</CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="flex flex-wrap gap-2">
						{skills.payment.map((tech, index) => (
						  <span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							{tech}
						  </span>
						))}
					  </div>
					</CardContent>
				  </Card>

				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Security & Cybersecurity</CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="flex flex-wrap gap-2">
						{skills.security.map((item, index) => (
						  <span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							{item}
						  </span>
						))}
					  </div>
					</CardContent>
				  </Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Technologies</CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="flex flex-wrap gap-2">
						{skills.technologies.map((tech, index) => (
						  <span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							{tech}
						  </span>
						))}
					  </div>
					</CardContent>
				  </Card>

				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>Cloud & Infrastructure</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
					  <div>
						<h3 className="text-sm font-medium text-gray-400 mb-2">Cloud Platforms</h3>
						<div className="flex flex-wrap gap-2">
						  {skills.cloud.map((item, index) => (
							<span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							  {item}
							</span>
						  ))}
						</div>
					  </div>
					  <div>
						<h3 className="text-sm font-medium text-gray-400 mb-2">Databases</h3>
						<div className="flex flex-wrap gap-2">
						  {skills.databases.map((db, index) => (
							<span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							  {db}
							</span>
						  ))}
						</div>
					  </div>
					</CardContent>
				  </Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>DevOps Toolchain</CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="flex flex-wrap gap-2">
						{skills.devops.map((tool, index) => (
						  <span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							{tool}
						  </span>
						))}
					  </div>
					</CardContent>
				  </Card>

				  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
					<CardHeader>
					  <CardTitle>IoT & Home Lab</CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="flex flex-wrap gap-2">
						{skills.iot.map((item, index) => (
						  <span key={index} className="inline-flex items-center rounded-md bg-[#252525] px-2.5 py-0.5 text-sm font-medium text-gray-300">
							{item}
						  </span>
						))}
					  </div>
					</CardContent>
				  </Card>
				</div>
			  </div>
			)}

			{/* Education Tab */}
			{activeTab === 'education' && (
			  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
				  <CardHeader>
					<CardTitle>Education</CardTitle>
				  </CardHeader>
				  <CardContent className="space-y-2">
					<div className="space-y-4">
					  {[
						["University", education.university],
						["Degree", education.degree],
						["Major", education.major],
						["GPA", education.gpa.toString()],
					  ].map(([label, value]) => (
						<div key={label} className="flex justify-between text-sm">
						  <span className="text-gray-400">{label}:</span>
						  <span className="text-gray-300 font-medium">{value}</span>
						</div>
					  ))}
					</div>
				  </CardContent>
				</Card>

				<Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
				  <CardHeader>
					<CardTitle>Certifications</CardTitle>
				  </CardHeader>
				  <CardContent>
					<div className="space-y-2">
					  {certifications.map((cert, index) => (
						<div key={index} className="flex items-start">
						  <span className="text-green-400 mr-2">&#8226;</span>
						  <span className="text-gray-300">{cert}</span>
						</div>
					  ))}
					</div>
				  </CardContent>
				</Card>
			  </div>
			)}

			{/* Competencies Tab */}
			{activeTab === 'competencies' && (
			  <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
				<CardHeader>
				  <CardTitle>Core Competencies</CardTitle>
				</CardHeader>
				<CardContent>
				  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{competencies.map((comp, index) => (
					  <div key={index} className="bg-[#252525] rounded-lg p-4 border-l-4 border-green-500">
						<p className="text-gray-300">{comp}</p>
					  </div>
					))}
				  </div>
				</CardContent>
			  </Card>
			)}
		  </div>
		</div>

		{/* Footer */}
		<footer className="bg-[#1E1E1E]/50 backdrop-blur-sm text-gray-400 text-center py-6 mt-8 border-t border-gray-800/50 relative z-10">
		<p className="flex items-center justify-center">
		  <span className="text-green-500 mr-2">&lt;/&gt;</span> 
		  Â© {new Date().getFullYear()} {profile.name} &#8226; Software Developer
		</p>
		  <p className="text-gray-500 mt-2">Built with React and TypeScript</p>
		</footer>
	  </main>
	</>
  );
}
