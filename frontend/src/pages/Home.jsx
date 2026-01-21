import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../layout/index';
import Content from '../layout/Content'; 
import ContentGrid from '../features/content/ContentGrid'

const CATEGORIES = ['fiction', 'science', 'art', 'daily', 'history'];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="relative pt-24 pb-32 md:pt-40 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-muted/40 to-background opacity-80" />
        
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Augen
            </span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Where creators share vision. Where readers find clarity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all text-lg shadow-lg shadow-primary/20"
            >
              Explore Contents
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border border-primary/60 text-primary rounded-xl font-medium hover:bg-primary/10 transition-all text-lg"
            >
              Start Creating →
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured Stories
          </h2>
          
          <ContentGrid 
            limit={6} 
            featuredOnly={true} 
            start={0} 
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-4xl font-bold">Latest from Creators</h2>
            <Link 
              to="/explore" 
              className="text-primary hover:underline font-medium text-lg"
            >
              View all →
            </Link>
          </div>
          
          <ContentGrid 
            limit={9} 
            start={6}   
          />
        </div>
      </section>

      <section className="py-16 bg-surface/50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">
            Discover by Topic
          </h3>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/explore?category=${cat}`}
                className="px-6 py-3 bg-surface border border-muted/60 rounded-full text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all font-medium capitalize shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>


        <section className="py-20 bg-gradient-to-b from-background to-surface/40 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Share Your Vision?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of creators publishing freely on Augen — no gatekeepers, just your ideas.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-surface border border-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Get Updates
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Get notified about new stories, featured creators, and platform updates.
            </p>
          </div>

          <div className="mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
            >
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}