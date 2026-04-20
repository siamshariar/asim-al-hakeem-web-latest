import {
  getHomeLectures,
  getOptHomeQuotes,
  getHomeArticles,
  getAllPlaylists2,
  getHomeBooks,
  getHomeQna,
  getHeaderLectures,
  getAllQnaCategory,
} from "../lib/fetch";

import Meta from "../components/meta";
import Header2 from "../components/header1";
import HeroBanner from "../components/home/hero-banner";
import RecentLecturesEnhanced from "../components/home/recent-lectures-enhanced";
import FeaturedBooks from "../components/home/featured-books";
import ArticlesSection from "../components/home/articles-enhanced";
import QASection from "../components/home/qa-section";
import CounsellingCTA from "../components/home/counselling-cta";
import TestimonialsSection from "../components/home/testimonials-section";
import NewsletterSection from "../components/home/newsletter-section";
import StatsSection from "../components/home/stats-section";
import AboutPreview from "../components/home/about-preview";

export default function Home({
  lectures = null,
  headerLectures = null,
  quotes = [],
  articles = [],
  playlists = [],
  books = [],
  qna = [],
  qna_categories = [],
}) {
  return (
    <>
      <Meta
        title="Sheikh Assim Al Hakeem - Official Website"
        description="Sheikh Assim bin Luqman al-Hakeem is a prominent Islamic scholar providing authentic Islamic knowledge through lectures, books, articles, and Q&A sessions."
        url="https://assimalhakeem.com"
        image="/img/og-image.jpg"
        type="website"
      />

      <Header2
        playlists={playlists}
        lectures={headerLectures}
        qna_categories={qna_categories}
      />

      <main className="overflow-hidden">
        <HeroBanner />
        <StatsSection />
        <RecentLecturesEnhanced lectures={lectures} />
        <AboutPreview />
        <FeaturedBooks books={books} />
        <ArticlesSection articles={articles} />
        
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#eef2ff] via-[#f7f7fe] to-white">
          <div className="container max-w-[1260px] mx-auto px-2.5 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              <QASection qna={qna} />
              <CounsellingCTA />
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <NewsletterSection />
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const [
      lectures,
      headerLectures,
      quotes,
      articles,
      playlistsData,
      books,
      qna,
      qna_categories,
    ] = await Promise.all([
      getHomeLectures().catch(() => null),
      getHeaderLectures().catch(() => null),
      getOptHomeQuotes().catch(() => []),
      getHomeArticles().catch(() => []),
      getAllPlaylists2().catch(() => ({ playlists: [], playlistsTitle: {} })),
      getHomeBooks().catch(() => []),
      getHomeQna().catch(() => []),
      getAllQnaCategory().catch(() => []),
    ]);

    return {
      props: {
        lectures: lectures || null,
        headerLectures: headerLectures || null,
        quotes: quotes || [],
        articles: articles || [],
        playlists: playlistsData?.playlists || [],
        books: books || [],
        qna: qna || [],
        qna_categories: qna_categories || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        lectures: null,
        headerLectures: null,
        quotes: [],
        articles: [],
        playlists: [],
        books: [],
        qna: [],
        qna_categories: [],
      },
      revalidate: 60,
    };
  }
}
