'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Wifi, Battery, ShieldAlert, Crosshair, Navigation, Play, Zap, CheckCircle2, Sliders, LucideIcon, ArrowRight, Sparkles } from 'lucide-react';
import Drone3D, { DroneFlightMode } from '@/components/3d/Drone3D';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface FlightModeOption {
  id: DroneFlightMode;
  title: string;
  badge: string;
  altitude: string;
  speed: string;
  battery: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

const FLIGHT_MODES: FlightModeOption[] = [
  {
    id: 'hover',
    title: 'STABLE HOVER MODE',
    badge: 'ALTITUDE HOLD',
    altitude: '12.4 m',
    speed: '0.0 m/s',
    battery: '94%',
    desc: 'GPS & Barometric lock maintains position while students inspect flight sensors and gyroscope dynamics.',
    icon: Compass,
    color: '#0284C7'
  },
  {
    id: 'orbit',
    title: '360° ORBIT PATROL',
    badge: 'SURVEILLANCE LOOP',
    altitude: '18.2 m',
    speed: '4.5 m/s',
    battery: '88%',
    desc: 'Automated waypoint circling around inspection targets for aerial photography and security mapping.',
    icon: Navigation,
    color: '#FF6B00'
  },
  {
    id: 'scan',
    title: 'LIDAR TERRAIN SCAN',
    badge: 'LASER DEPTH GRID',
    altitude: '6.5 m',
    speed: '1.2 m/s',
    battery: '81%',
    desc: 'Point-cloud depth sensor mapping terrain elevation, obstacles, and 3D architectural features.',
    icon: Crosshair,
    color: '#10B981'
  },
  {
    id: 'takeoff',
    title: 'AUTONOMOUS LAUNCH',
    badge: 'THRUST SEQUENCE',
    altitude: '28.0 m',
    speed: '8.8 m/s',
    battery: '76%',
    desc: 'High-thrust vertical takeoff sequence testing motor ESC response and accelerometer flight limits.',
    icon: Zap,
    color: '#7928CA'
  }
];

export default function DroneEducationSection() {
  const [activeFlightMode, setActiveFlightMode] = useState<DroneFlightMode>('hover');
  const [propSpeed, setPropSpeed] = useState(1.0);
  const [altitude, setAltitude] = useState(15);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentMode = FLIGHT_MODES.find(m => m.id === activeFlightMode) || FLIGHT_MODES[0];

  return (
    <section id="drones" className="relative py-28 bg-muted/20 overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[40vw] h-[40vw] max-w-[600px] bg-accent/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono font-bold text-secondary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              AEROSPACE &amp; DRONE LAB
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              DRONE TECHNOLOGY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#6366F1] to-[#FF6B00]">DEMO</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore aerodynamics, motor thrust curves, LiDAR terrain mapping, and autonomous waypoint flight missions on our interactive 3D quadcopter.
            </p>
          </SectionReveal>

          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {FLIGHT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeFlightMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveFlightMode(mode.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-card border-2 shadow-lg text-foreground scale-105'
                      : 'bg-card/70 border border-border text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive ? { borderColor: mode.color } : {}}
                >
                  <Icon className="w-4 h-4" style={{ color: mode.color }} />
                  <span>{mode.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D DISPLAY & CONTROL GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* LEFT: 3D Canvas (7 Cols) */}
          <div className="lg:col-span-7 h-[460px] sm:h-[540px] bg-card rounded-3xl border border-border shadow-xl relative overflow-hidden p-2 flex flex-col justify-between group">
            
            {/* Top Telemetry Overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-xl text-[11px] font-mono font-bold bg-card/90 border border-border text-foreground flex items-center gap-2 shadow-sm">
                <Plane className="w-3.5 h-3.5 text-secondary animate-bounce" />
                MISSION: {currentMode.badge}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground bg-card/80 px-2.5 py-1 rounded-lg border border-border shadow-sm">
                DRAG TO ROTATE
              </span>
            </div>

            {/* 3D Drone Component */}
            <div className="w-full h-full relative">
              <Drone3D
                flightMode={activeFlightMode}
                propSpeed={propSpeed}
                laserActive={activeFlightMode === 'scan'}
              />
            </div>

            {/* Bottom HUD Telemetry Strip */}
            <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 bg-card/90 border border-border rounded-2xl p-3 text-center backdrop-blur-md shadow-md">
              <div className="flex items-center justify-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                <div className="text-left">
                  <div className="text-[9px] font-mono text-muted-foreground">ALTITUDE</div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">{altitude} m</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <div className="text-left">
                  <div className="text-[9px] font-mono text-muted-foreground">AIRSPEED</div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">{currentMode.speed}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Battery className="w-3.5 h-3.5 text-emerald-500" />
                <div className="text-left">
                  <div className="text-[9px] font-mono text-muted-foreground">BATTERY</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-500">{currentMode.battery}</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Telemetry Controls & Learning Syllabus (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {(() => {
                const Icon = currentMode.icon;
                return (
                  <motion.div
                    key={activeFlightMode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="p-3 rounded-2xl shadow-sm"
                        style={{ background: `${currentMode.color}15`, color: currentMode.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-wider block">AVIONICS SYLLABUS</span>
                        <h3 className="text-xl font-bold text-foreground">{currentMode.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {currentMode.desc}
                    </p>

                    {/* Flight Controls */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-foreground">
                        <span>ROTOR THRUST (RPM)</span>
                        <span className="text-secondary">{(propSpeed * 5200).toFixed(0)} RPM</span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="2.5"
                        step="0.1"
                        value={propSpeed}
                        onChange={(e) => setPropSpeed(Number(e.target.value))}
                        className="w-full accent-sky-600 cursor-pointer"
                      />

                      <div className="flex items-center justify-between text-xs font-mono font-bold text-foreground pt-1">
                        <span>FLIGHT CEILING (ALTITUDE)</span>
                        <span className="text-accent">{altitude} Meters</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={altitude}
                        onChange={(e) => setAltitude(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>To know more about us contact us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
