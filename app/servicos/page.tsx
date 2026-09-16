import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('pages').select('content').eq('slug', 'servicos').single();
  const content = data?.content || {};

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            alt="Industrial complex at sunset with modern architecture"
            className="object-cover grayscale brightness-[0.35] contrast-125"
            src="/images/products/geosynthetics_hero_1772752854099.png"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-12 text-primary text-xs font-bold tracking-[0.4em] uppercase">
            <Link className="hover:text-white transition-colors" href="/">Home</Link>
            <span className="text-[8px]">●</span>
            <span className="text-primary">Serviços</span>
          </div>
          <div className="max-w-4xl flex flex-col items-center">
            <h1 className="text-4xl md:text-7xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-white mb-6 uppercase font-industrial leading-[1.05] opacity-95 drop-shadow-lg">
              {content.title ? (
                <span dangerouslySetInnerHTML={{ __html: content.title.replace('Serviços', '<span class="text-primary">Serviços</span>') }} />
              ) : (
                <>
                  Nossos <br />
                  <span className="text-primary">Serviços</span>
                </>
              )}
            </h1>
            <div className="h-1 w-24 bg-primary mb-10"></div>
            {content.description ? (
              <div
                className="prose prose-invert prose-xl max-w-2xl font-light leading-relaxed text-slate-300 mx-auto prose-p:text-slate-300"
                dangerouslySetInnerHTML={{ __html: content.description }}
              />
            ) : (
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed drop-shadow">
                Soluções Completas em Segurança Industrial.<br />
                Do planejamento estratégico à execução técnica de alta precisão.
              </p>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-24 w-full">

        {/* Service Pillars */}
        <section className="grid gap-12 mb-24">
          {(() => {
            const defaultCards = [
              {
                id: 'c1',
                tag: 'Pilar 01',
                title: 'Projetos',
                icon: 'architecture',
                description: 'Desenvolvemos projetos de proteção coletiva voltados à realidade de cada obra. Definimos soluções, materiais e formas de instalação considerando os riscos das atividades, as características da construção e a aplicação prática no canteiro.',
                list: [
                  'Projetos de sistemas de proteção coletiva',
                  'Dimensionamento e especificação de materiais',
                  'Detalhamento técnico para instalação'
                ],
                buttonText: 'Conhecer Projetos',
                buttonLink: '#',
                image: '/images/products/engineering_consultancy_professional_construction_office_plans_site_visit_1772753110437.png'
              },
              {
                id: 'c2',
                tag: 'Pilar 02',
                title: 'Instalação',
                icon: 'construction',
                description: 'Instalamos sistemas de proteção coletiva de acordo com as necessidades e as etapas de cada obra. Nossa atuação considera as condições do local e as atividades em execução, com foco na proteção dos trabalhadores e na segurança do canteiro.',
                list: [
                  'Instalação de proteções coletivas',
                  'Montagem conforme projeto e condições da obra',
                  'Adequação das proteções às etapas construtivas'
                ],
                buttonText: 'Solicitar Orçamento',
                buttonLink: '#',
                image: '/images/products/technical_installation_service_workers_pond_liner_1772753090312.png'
              },
              {
                id: 'c3',
                tag: 'Pilar 03',
                title: 'Consultoria em Segurança do Trabalho',
                icon: 'health_and_safety',
                description: 'Apoiamos sua equipe na identificação de riscos e na definição de medidas de prevenção para o dia a dia da obra. Orientamos a escolha, a aplicação e a adequação das proteções coletivas, contribuindo para um canteiro mais seguro e organizado.',
                list: [
                  'Avaliação das condições de segurança da obra',
                  'Orientação técnica sobre proteções coletivas',
                  'Recomendações de adequação e melhoria'
                ],
                buttonText: 'Falar com Especialista',
                buttonLink: '#',
                image: '/images/products/lifeline_anchorage_system_safety_worker_high_rise_1772753076458.png'
              }
            ];

            const cardsToRender = content.cards && content.cards.length > 0 ? content.cards : defaultCards;

            const getPilarIcon = (card: any, idx: number) => {
              if (card.icon) return card.icon;
              const titleLower = (card.title || '').toLowerCase();
              if (titleLower.includes('projeto')) return 'architecture';
              if (titleLower.includes('instala')) return 'construction';
              if (titleLower.includes('segurança') || titleLower.includes('consultoria')) return 'health_and_safety';
              return idx === 0 ? 'architecture' : idx === 1 ? 'construction' : 'health_and_safety';
            };

            return cardsToRender.map((card: any, index: number) => {
              const isReverse = index % 2 !== 0; // Alternando a ordem das colunas
              const iconName = getPilarIcon(card, index);

              return (
                <div key={card.id || index} className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center bg-slate-900/40 p-6 md:p-8 rounded-xl border border-slate-800 hover:border-slate-700/80 transition-colors`}>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-lg">{iconName}</span>
                      </div>
                      {card.tag && <span className="text-primary font-bold text-xs tracking-widest uppercase font-display">{card.tag}</span>}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 font-display">{card.title}</h3>
                    <p className="text-slate-400 leading-relaxed whitespace-pre-line text-sm lg:text-base">
                      {card.description}
                    </p>
                    {card.list && card.list.length > 0 && (
                      <ul className="space-y-2.5 text-slate-300 mb-6">
                        {card.list.map((item: string, i: number) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
                            <span className="text-sm lg:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {(card.buttonText || card.buttonLink) && (
                      <a 
                        href={`https://wa.me/5571987203123?text=${encodeURIComponent(`Olá! Gostaria de mais informações sobre ${card.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-background-dark transition-all rounded font-medium font-display uppercase text-sm tracking-wider mt-4 inline-block shadow-lg shadow-primary/5"
                      >
                        {card.buttonText || "Solicitar Orçamento"}
                      </a>
                    )}
                  </div>
                  <div className="flex-1 w-full h-72 lg:h-96 rounded-lg overflow-hidden shadow-2xl relative border border-slate-800 flex items-center justify-center bg-black/20">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt={card.title || "Serviço"}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-6xl text-white/5">image</span>
                    )}
                  </div>
                </div>
              );
            });
          })()}
        </section>

        {/* Process Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-100 mb-4 font-display">Nosso Fluxo de Trabalho</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">Um processo estruturado para garantir excelência em todas as etapas, desde a concepção até a operação contínua.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Connectors for Desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-slate-700 -z-10"></div>

            <div className="bg-background-dark border border-slate-800 p-8 rounded-lg text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 ring-4 ring-primary/5 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined text-3xl">architecture</span>
              </div>
              <h5 className="text-lg font-bold text-slate-100 mb-2 font-display">1. Concepção</h5>
              <p className="text-slate-500 text-sm">Diagnóstico situacional e definição de diretrizes estratégicas.</p>
            </div>

            <div className="bg-background-dark border border-slate-800 p-8 rounded-lg text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 ring-4 ring-primary/5 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined text-3xl">developer_board</span>
              </div>
              <h5 className="text-lg font-bold text-slate-100 mb-2 font-display">2. Engenharia</h5>
              <p className="text-slate-500 text-sm">Cálculos técnicos e especificação de componentes de hardware.</p>
            </div>

            <div className="bg-background-dark border border-slate-800 p-8 rounded-lg text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 ring-4 ring-primary/5 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined text-3xl">construction</span>
              </div>
              <h5 className="text-lg font-bold text-slate-100 mb-2 font-display">3. Execução</h5>
              <p className="text-slate-500 text-sm">Montagem em campo seguindo as mais rígidas normas de segurança.</p>
            </div>

            <div className="bg-background-dark border border-slate-800 p-8 rounded-lg text-center flex flex-col items-center hover:border-primary/50 transition-colors group">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 ring-4 ring-primary/5 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h5 className="text-lg font-bold text-slate-100 mb-2 font-display">4. Entrega</h5>
              <p className="text-slate-500 text-sm">Testes de aceitação (FAT/SAT) e homologação do sistema.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary p-10 md:p-16 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-20 shadow-[0_0_50px_rgba(204,166,114,0.15)]">
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold text-background-dark mb-4 font-display">{content.cta?.title || "Pronto para elevar o nível de segurança da sua planta?"}</h3>
            <p className="text-background-dark/80 text-lg">{content.cta?.text || "Nossos especialistas estão à disposição para realizar um diagnóstico inicial sem compromisso."}</p>
          </div>
          <a 
            href={`https://wa.me/5571987203123?text=${encodeURIComponent('Olá! Gostaria de agendar uma consultoria técnica com a Santa Marta.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background-dark text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-background-dark/90 transition-all shadow-xl font-display uppercase tracking-wide inline-block"
          >
            {content.cta?.buttonText || "Agendar Consultoria"}
          </a>
        </section>
      </main>
    </div>
  )
}
