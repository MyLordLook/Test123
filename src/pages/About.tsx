export default function About() {
  const values = [
    { title: 'Premium Quality', desc: 'Every piece is crafted from carefully sourced materials. We never compromise on the fabric, stitching, or finish.' },
    { title: 'Timeless Design', desc: 'Our designs transcend seasonal trends. We create wardrobe essentials that look just as sharp five years from now.' },
    { title: 'Accessible Luxury', desc: 'Premium doesn\'t mean unaffordable. We believe every individual deserves to dress with confidence and quality.' },
    { title: 'Sustainable Practices', desc: 'We\'re committed to responsible sourcing, ethical production, and reducing our environmental footprint.' },
  ];

  const team = [
    { name: 'Rohan Mehta', role: 'Founder & Creative Director', img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Isha Patel', role: 'Head of Design', img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Arjun Kapoor', role: 'Operations Director', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1852759/pexels-photo-1852759.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="About LordLook"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />
        <div className="absolute inset-0 flex items-end px-5 sm:px-12 pb-12">
          <div>
            <p className="label-upper text-[10px] text-[#f0ede8]/70 mb-2">Our Story</p>
            <h1 className="heading-editorial text-3xl sm:text-5xl text-[#FAFAF8] leading-tight">
              Dressed for the<br />Lord in You
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-upper text-[9px] text-[#888888] mb-3">Est. 2021</p>
            <h2 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-6 leading-tight">
              Born in Mumbai,<br />Made for the World
            </h2>
            <p className="sans-light text-sm text-[#888888] leading-relaxed mb-4">
              LordLook was founded with a singular vision: to make premium fashion accessible to every modern Indian. We were tired of choosing between quality and affordability — so we built the solution.
            </p>
            <p className="sans-light text-sm text-[#888888] leading-relaxed mb-4">
              Starting from a small studio in Mumbai's Bandra district, our founder Rohan Mehta began sourcing the finest cotton and linen fabrics directly from mills, eliminating the middlemen that inflate prices.
            </p>
            <p className="sans-light text-sm text-[#888888] leading-relaxed">
              Today, over 50,000 customers across India trust LordLook for their daily wardrobe. Each piece is still designed with the same obsessive attention to detail that started it all.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Brand story"
              className="w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#1a1a1a] text-[#FAFAF8] p-5 sm:p-6">
              <p className="heading-editorial text-3xl sm:text-4xl">50K+</p>
              <p className="label-upper text-[9px] text-[#f0ede8]/70 mt-1">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F5F5F3] dark:bg-[#1a1a1a] py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="label-upper text-[9px] text-[#888888] text-center mb-2">What Drives Us</p>
          <h2 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={i} className="bg-[#FAFAF8] dark:bg-[#0f0f0f] border border-[#e8e8e8] dark:border-[#2a2a2a] p-6 sm:p-8">
                <div className="w-10 h-10 border border-[#1a1a1a] dark:border-[#f0ede8] flex items-center justify-center mb-5">
                  <span className="heading-editorial text-lg text-[#1a1a1a] dark:text-[#f0ede8]">{i + 1}</span>
                </div>
                <h3 className="serif-italic text-base text-[#1a1a1a] dark:text-[#f0ede8] mb-2">{v.title}</h3>
                <p className="sans-light text-sm text-[#888888] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: '50K+', label: 'Customers' },
              { num: '200+', label: 'Products' },
              { num: '4.7', label: 'Avg Rating' },
              { num: '3 Yrs', label: 'In Business' },
            ].map((s) => (
              <div key={s.label}>
                <p className="heading-editorial text-3xl sm:text-4xl text-[#1a1a1a] dark:text-[#f0ede8] mb-1">{s.num}</p>
                <p className="sans-light text-xs text-[#888888]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#F5F5F3] dark:bg-[#1a1a1a] py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="label-upper text-[9px] text-[#888888] text-center mb-2">The People</p>
          <h2 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 object-cover mx-auto mb-4 border border-[#e8e8e8] dark:border-[#2a2a2a]"
                  loading="lazy"
                />
                <h3 className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] mb-1">{member.name}</h3>
                <p className="sans-light text-xs text-[#888888]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
