"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Rose {
    id: number;
    left: number;
    delay: number;
    image: string;
}

interface Balloon {
    id: number;
    left: number;
    color: string;
    emoji: string;
}

const colors: string[] = [
    'bg-pink-200', 'bg-purple-200', 'bg-blue-200', 'bg-red-200'
];

const emojis: string[] = ['🎈', '❤️', '🌸', '✨'];

const roseImages = [
    '/rose1.png',
    '/rose2.png',
    '/rose3.png'
];

const RosePage: React.FC = () => {
    const [roses, setRoses] = useState<Rose[]>([]);
    const [balloons, setBalloons] = useState<Balloon[]>([]);

    useEffect(() => {
        const createRose = () => {
            if (roses.length >= 12) return;
            const newRose: Rose = {
                id: Math.random(),
                left: Math.random() * 80 + 10,
                delay: Math.random() * 2,
                image: roseImages[Math.floor(Math.random() * roseImages.length)],
            };
            setRoses((prev) => [...prev, newRose]);
        };

        for (let i = 0; i < 6; i++) {
            createRose();
        }

        const roseInterval = setInterval(() => {
            if (roses.length < 12) {
                createRose();
            }
        }, 3000);

        return () => clearInterval(roseInterval);
    }, [roses.length]);

    useEffect(() => {
        const createBalloon = () => {
            if (balloons.length >= 4) return;
            const newBalloon: Balloon = {
                id: Math.random(),
                left: Math.random() * 80 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
            };
            setBalloons((prev) => [...prev, newBalloon]);
        };

        for (let i = 0; i < 4; i++) {
            createBalloon();
        }

        const balloonInterval = setInterval(() => {
            setBalloons((prev) => prev.filter((b) => b.id !== prev[0]?.id));
            setTimeout(() => createBalloon(), 1000);
        }, 3000);

        return () => clearInterval(balloonInterval);
    }, [balloons]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 to-pink-200 relative overflow-hidden flex flex-col items-center justify-center p-6 mt-0 pt-0">
            {balloons.map((balloon) => (
                <div
                    key={balloon.id}
                    className={`absolute bottom-0 transform transition-all ease-in-out duration-[5s] ${balloon.color} w-16 h-20 rounded-full flex items-center justify-center text-2xl shadow-lg animate-float`}
                    style={{
                        left: `${balloon.left}%`,
                        animation: "floatUp 5s linear forwards"
                    }}
                >
                    {balloon.emoji}
                    <div className="absolute top-2 left-3 w-4 h-4 bg-white opacity-50 rounded-full" />
                </div>
            ))}

            <div className="animate-pulse transform scale-105 hover:scale-110 transition duration-700 ease-in-out">
                <Image src="/rose4.png" alt="Rose Banner" width={250} height={250} className="mb-4 rounded-lg shadow-md" />
            </div>

            <h1 className="text-5xl font-bold text-red-600 mb-4">🌹 Happy Rose Day to my Rose like husband 🌹</h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl">
                Love you so much muahh 💖
            </p>

            {roses.map((rose) => (
                <div
                    key={rose.id}
                    className="absolute bottom-0 transform hover:scale-110 transition-transform cursor-pointer animate-bounce"
                    style={{
                        left: `${rose.left}%`,
                        animationDelay: `${rose.delay}s`,
                        animationDuration: '3s',
                    }}
                >
                    <Image src={rose.image} alt="Floating Rose" width={100} height={100} className="rounded-full shadow-lg" />
                </div>
            ))}

            <style jsx>{`
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default RosePage;
