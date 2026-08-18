'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Wifi, Battery, ShieldAlert, Crosshair, Navigation, Play, Zap, CheckCircle2, Sliders, LucideIcon } from 'lucide-react';
import Drone3D, { DroneFlightMode } from '@/components/3d/Drone3D';
import SectionReveal from '@/components/animations/SectionReveal';

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
    color: '#00BFFF'
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
    badge: 'GREEN LASER GRID',
    altitude: '6.5 m',
    speed: '1.2 m/s',
    battery: '81%',
    desc: 'Point-cloud depth sensor mapping terrain elevation, obstacles, and 3D architectural features.',
    icon: Crosshair,
    color: '#00FF66'
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
    color: '#7B2DFF'
  }
];

export default function DroneEducationSection() {
  const [flightMode, setFlightMode] = useState<DroneFlightMode>('hover');
  const [propSpeed, setPropSpeed] = useState<number>(1.2);
  const [laserActive, setLaserActive] = useState<boolean>(true);

  const currentMode = FLIGHT_MODES.find((m) => m.id === flightMode) || FLIGHT_MODES[0];
  const CurrentModeIcon = currentMode.icon;

  return (
    <section id="drones" className="py-28 bg-[#03060d] relative overflow-hidden text-white border-t border-white/10">
      
      {/* Background Neon Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#00FF66]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#00BFFF]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 inline-flex items-center gap-1.5 mb-4">
              <Plane className="w-3.5 h-3.5" />
              AERIAL ROBOTICS & DRONE SIMULATOR
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              MASTERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00BFFF] to-[#FF6B00]">DRONE TECHNOLOGY</span> IN CLASSROOMS
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              From flight physics and motor aerodynamics to LiDAR scanning and autonomous flight path programming.
            </p>
          </div>
        </SectionReveal>

        {/* FLIGHT MODE ACTION TABS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {FLIGHT_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = flightMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setFlightMode(mode.id);
                  if (mode.id === 'scan') setLaserActive(true);
                }}
                className={`flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                  isActive
                    ? 'border-[#00FF66] bg-white/10 shadow-[0_0_25px_rgba(0,255,102,0.25)] scale-[1.02]'
                    : 'border-white/10 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon className="w-5 h-5" style={{ color: mode.color }} />
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                    {mode.badge}
                  </span>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">{mode.title}</div>
              </button>
            );
          })}
        </div>

        {/* 3D DRONE FLIGHT SIMULATOR & HUD DISPLAY */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: 3D DRONE MODEL CANVAS WITH HUD OVERLAY (7 Cols) */}
          <div className="lg:col-span-7 h-[480px] sm:h-[550px] bg-black/80 rounded-3xl border border-[#00FF66]/30 backdrop-blur-2xl relative overflow-hidden p-2 flex flex-col justify-between shadow-[0_0_50px_rgba(0,255,102,0.15)]">
            
            {/* HUD TELEMETRY TOP BAR OVERLAY */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-[11px] pointer-events-none">
              <div className="flex items-center gap-3 bg-black/80 border border-white/20 px-3 py-1.5 rounded-xl">
                <span className="flex items-center gap-1.5 text-[#00FF66] font-bold">
                  <Wifi className="w-3.5 h-3.5 animate-pulse" />
                  12 SATS CONNECTED
                </span>
                <span className="text-white/40">|</span>
                <span className="text-white/80">MODE: {currentMode.badge}</span>
              </div>

              <div className="flex items-center gap-2 bg-black/80 border border-white/20 px-3 py-1.5 rounded-xl">
                <Battery className="w-3.5 h-3.5 text-[#00BFFF]" />
                <span className="text-white font-bold">{currentMode.battery}</span>
              </div>
            </div>

            {/* 3D Drone Canvas */}
            <div className="w-full h-full relative">
              <Drone3D
                flightMode={flightMode}
                propSpeed={propSpeed}
                laserActive={laserActive}
              />
            </div>

            {/* HUD FLIGHT TELEMETRY READOUT BOTTOM OVERLAY */}
            <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-4 gap-2 bg-black/90 border border-[#00FF66]/40 rounded-2xl p-3 text-center backdrop-blur-md">
              <div>
                <div className="text-[9px] font-mono text-white/50">ALTITUDE</div>
                <div className="text-sm font-bold font-mono text-[#00FF66]">{currentMode.altitude}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/50">GROUND SPEED</div>
                <div className="text-sm font-bold font-mono text-[#00BFFF]">{currentMode.speed}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/50">LIDAR SENSOR</div>
                <div className="text-sm font-bold font-mono text-[#FF6B00]">{laserActive ? 'ONLINE' : 'OFF'}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/50">THROTTLE ESC</div>
                <div className="text-sm font-bold font-mono text-[#7B2DFF]">{(propSpeed * 80).toFixed(0)}%</div>
              </div>
            </div>

          </div>

          {/* RIGHT: DRONE CURRICULUM & INTERACTIVE CONTROLS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#090D16] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <CurrentModeIcon className="w-6 h-6 text-[#00FF66]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#00FF66] tracking-wider uppercase">
                    ACTIVE FLIGHT SEQUENCE
                  </span>
                  <h3 className="text-xl font-bold text-white">{currentMode.title}</h3>
                </div>
              </div>

              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                {currentMode.desc}
              </p>

              {/* Drone Learning Modules List */}
              <div className="space-y-2.5 mb-6">
                {[
                  'Aerodynamics & Thrust-to-Weight Physics',
                  'Quad-Rotor PID Controller Tuning',
                  'LiDAR & Optical Flow Obstacle Avoidance',
                  'Autonomous Waypoint Mission Programming'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF66] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Flight Controls */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#00FF66]" />
                    PROPELLER THROTTLE (RPM)
                  </span>
                  <span className="text-[#00FF66]">{(propSpeed * 3000).toFixed(0)} RPM</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.1"
                  value={propSpeed}
                  onChange={(e) => setPropSpeed(Number(e.target.value))}
                  className="w-full accent-[#00FF66] cursor-pointer"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono font-bold text-white/80 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-[#00BFFF]" />
                    LIDAR LASER BEAM
                  </span>
                  <button
                    onClick={() => setLaserActive(!laserActive)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      laserActive
                        ? 'bg-[#00FF66] text-black shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {laserActive ? 'LASER ON' : 'LASER OFF'}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
