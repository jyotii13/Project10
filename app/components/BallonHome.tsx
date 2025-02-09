"use client"

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface Balloon {
    id: number;
    left: number;
    delay: number;
    color: string;
    emoji: string;
}

const BalloonHome: React.FC = () => {
    const [balloons, setBalloons] = useState<Balloon[]>([]);

    const colors: string[] = [
        'bg-pink-200', 'bg-purple-200', 'bg-blue-200', 'bg-red-200', 'bg-yellow-200', 'bg-green-200'
    ];

    const emojis: string[] = ['🎈', '❤️', '🌸', '✨', '🎀'];

    useEffect(() => {
        const createBalloon = () => {
            if (balloons.length >= 20) return; // Stop adding balloons if the limit is reached

            const newBalloon: Balloon = {
                id: Math.random(),
                left: Math.random() * 80 + 10, // Keep balloons away from edges
                delay: Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
            };
            setBalloons((prev) => [...prev, newBalloon]);
        };

        // Create initial balloons
        for (let i = 0; i < 8; i++) {
            createBalloon();
        }

        // Add new balloons periodically
        const interval = setInterval(() => {
            if (balloons.length < 12) {
                createBalloon();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleBalloonClick = (id: number) => {
        // Remove clicked balloon with a pop effect
        setBalloons((prev) => prev.filter((b) => b.id !== id));

        // Add a new balloon after a short delay
        setTimeout(() => {
            if (balloons.length < 12) {
                const newBalloon: Balloon = {
                    id: Math.random(),
                    left: Math.random() * 80 + 10,
                    delay: 0,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    emoji: emojis[Math.floor(Math.random() * emojis.length)],
                };
                setBalloons((prev) => [...prev, newBalloon]);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden">
            {/* Title */}
            <div className="text-center pt-8">
                <h1 className="text-4xl font-bold text-pink-500 mb-2">Happy Valentine&apos;s Honey</h1>
                <p className="text-lg text-gray-600">Muuuuuuuaaaaaaaaaaaaahhhhhhhhhh 💕</p>
            </div>

            {/* Floating Balloons */}
            {balloons.map((balloon) => (
                <button
                    key={balloon.id}
                    onClick={() => handleBalloonClick(balloon.id)}
                    className="absolute bottom-0 transform hover:scale-110 transition-transform cursor-pointer animate-bounce text-center group"
                    style={{
                        left: `${balloon.left}%`,
                        animationDelay: `${balloon.delay}s`,
                        animationDuration: '3s',
                    }}
                >
                    {/* Balloon String */}
                    <div className="absolute bottom-0 left-1/2 w-px h-16 bg-gray-300 -z-10" />

                    {/* Balloon */}
                    <div
                        className={`relative ${balloon.color} w-16 h-20 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all group-hover:shadow-xl`}
                    >
                        {balloon.emoji}
                        {/* Balloon reflection */}
                        <div className="absolute top-2 left-3 w-4 h-4 bg-white opacity-50 rounded-full" />
                    </div>
                </button>
            ))}

            {/* Decorative Hearts */}
            <div className="fixed bottom-4 left-4">
                <Heart className="text-pink-300 w-8 h-8" />
            </div>
            <div className="fixed bottom-4 right-4">
                <Heart className="text-pink-300 w-8 h-8" />
            </div>
        </div>
    );
};

export default BalloonHome;
