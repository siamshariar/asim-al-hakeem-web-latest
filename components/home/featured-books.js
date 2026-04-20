import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, User, ArrowRight } from "lucide-react";

// Home Page Book Card - Full Image Left, Content Right
function HomeBookCard({ book }) {
    const { bookName, imageSrc, bookSlug, bookExcerpt, writer } = book;
    
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
        >
            <Link href={`/books/${bookSlug}`} className="flex flex-col md:flex-row h-full">
                {/* Left Side - Full Cover Image (No padding, No background) */}
                <div className="w-full md:w-2/5 relative overflow-hidden flex-shrink-0 min-h-[260px] md:min-h-0">
                    <Image
                        src={imageSrc || "/img/books/default.jpg"}
                        alt={bookName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 250px"
                        priority={false}
                    />
                </div>
                
                {/* Right Side - Content with padding */}
                <div className="w-full md:w-3/5 p-4 lg:p-5 flex flex-col bg-white">
                    <div className="flex items-center gap-1.5 text-[#10b981] mb-2">
                        <BookOpen size={14} />
                        <span className="text-xs font-medium uppercase tracking-wider">Featured Book</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-[#1a1f2e] mb-1 group-hover:text-[#10b981] transition-colors line-clamp-2">
                        {bookName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs lg:text-sm mb-2">
                        <User size={14} />
                        <span>{writer}</span>
                    </div>
                    {bookExcerpt && (
                        <p className="text-gray-600 text-xs lg:text-sm line-clamp-2 lg:line-clamp-3 mb-3">
                            {bookExcerpt}
                        </p>
                    )}
                    <div className="flex items-center text-[#10b981] font-medium text-xs lg:text-sm group-hover:gap-2 transition-all mt-auto">
                        <span>Learn More</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function FeaturedBooks({ books }) {
    const featuredBooks = books?.slice(0, 4) || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (!featuredBooks.length) return null;

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#ecfdf5] via-[#f8fafc] to-white">
            <div className="container max-w-[1260px] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="text-[#10b981] font-semibold uppercase tracking-wider text-sm">Knowledge Library</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1f2e] mt-2 mb-3">Featured Islamic Books</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore authentic Islamic literature to deepen your understanding of the Deen
                    </p>
                </motion.div>

                {/* Books Grid - All cards have same layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-5 lg:gap-6"
                >
                    {featuredBooks.map((book) => (
                        <motion.div key={book.id} variants={itemVariants}>
                            <HomeBookCard book={book} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link href="/books">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 bg-[#10b981] text-white rounded-full font-medium shadow-lg shadow-[#10b981]/25 hover:shadow-xl hover:shadow-[#10b981]/30 transition-all"
                        >
                            Browse All Books
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}