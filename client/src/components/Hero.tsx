/**
 * Hero Section Component
 * Personalized for Ahmed Taha - AI & Computer Science Student
 */

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://private-us-east-1.manuscdn.com/sessionFile/gLpcwwrzrn2pr5rp77pBEW/sandbox/rtJ4GUfksQBtMarcgm30IB-img-1_1771086798000_na1fn_aGVyby1hYnN0cmFjdC1taW5pbWFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZ0xwY3d3cnpybjJwcjVycDc3cEJFVy9zYW5kYm94L3J0SjRHVWZrc1FCdE1hcmNnbTMwSUItaW1nLTFfMTc3MTA4Njc5ODAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEMxdGFXNXBiV0ZzLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=p1nRRw~On2Ss0C7m4fwKAdGRDD0jo2j1kgQSDabbHdu1OQ6w-qYEzLjIzt892SdwKO-pDqJ2To1v-R3N76WTfPBMON1TUl9HWOKlG3FFptqi-Wop9s7zBKIDNsisxvlshIRI22TTor0YOzymfa~Y~Vts94NgOZqeR5cPewZ8Z~cVV83nmFPM8JO9MuQE0jtkij7YWdN61Docw5jH6LomIxBixczA1tTBqJhIWSE63Ydv7lcYqlNpYOISbsgjkTrR7pyVkhCWDGvU2voI6yG51x7dvaK34cb-qgAXgZeQdAVf7YuTBUZ7AaoDV7BvWPIXny-c3QuCp9ZzbnoabGCOhA__')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Content */}
      <div className="container relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="font-display font-bold text-5xl md:text-7xl text-foreground mb-6 tracking-tight">
          Ahmed Taha
        </h1>
        <p className="text-2xl md:text-3xl text-accent font-semibold mb-4">
          AI & Computer Science Student
        </p>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed max-w-2xl mx-auto">
          Computer Science student at Universiti Sains Malaysia specializing in 
          artificial intelligence, software development, and computer vision. 
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-sans font-semibold rounded-sm hover:bg-accent/90 transition-colors duration-300"
          >
            View My Projects
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-foreground/10 text-foreground font-sans font-semibold rounded-sm hover:bg-foreground/20 transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}