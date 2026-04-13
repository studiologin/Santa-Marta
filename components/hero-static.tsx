"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroStatic() {
  return (
    <section className="relative h-screen w-full bg-background-dark overflow-hidden flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/capa-sm.JPG"
          alt="Santa Marta Engenharia - Sistemas de Proteção"
          fill
          priority
          className="object-cover brightness-[0.4] contrast-125"
        />
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start w-full">
        <div className="max-w-4xl space-y-4 md:space-y-6 flex flex-col items-start w-full pt-16 md:pt-24 lg:pt-28">
          <div className="flex items-center justify-start gap-4 mb-2 md:mb-0">
            <div className="h-[2px] w-12 bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.4em] text-xs md:text-sm uppercase italic">Desde 1986</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-[6.5rem] font-bold tracking-tight text-white mb-4 md:mb-6 uppercase font-industrial leading-[1] opacity-95 text-left drop-shadow-2xl">
            Sistemas de <br />
            <span className="text-primary inline-block">Proteção</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl font-light leading-relaxed drop-shadow-lg">
            Referência absoluta em geossintéticos e engenharia de alta performance para os projetos de infraestrutura mais complexos do país.
          </p>
          <div className="pt-4 md:pt-6 lg:pt-8 flex flex-wrap justify-start gap-4">
            <Link
              href="/servicos"
              className="bg-primary text-background-dark px-8 py-3 md:px-12 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(204,166,114,0.4)] transition-all duration-300"
            >
              Nossos Serviços
            </Link>
            <Link
              href="/sobre"
              className="border border-white/30 text-white px-8 py-3 md:px-12 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-background-dark transition-all duration-300 backdrop-blur-sm"
            >
              Conheça a Empresa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
