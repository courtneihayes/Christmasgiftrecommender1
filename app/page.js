'use client';

import { useState } from 'react';

export default function Home() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('');
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    setError('');
    setGifts([]);

    setTimeout(() => {
      if (!age || !gender || !interests || !budget) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const gifts = generateGiftRecommendations(age, gender, interests, budget);
      setGifts(gifts);
      setLoading(false);
    }, 500);
  };

  const generateGiftRecommendations = (age, gender, interests, budget) => {
    const interestList = interests.toLowerCase().split(',').map(i => i.trim());
    const ageNum = parseInt(age);
    const budgetNum = parseFloat(budget);

    const giftDatabase = {
      gaming: [
        { name: 'Gaming Mouse', price: 40, description: 'High precision gaming mouse with RGB lighting' },
        { name: 'Mechanical Keyboard', price: 80, description: 'Mechanical keyboard for gaming and typing' },
        { name: 'Gaming Headset', price: 60, description: 'Immersive audio gaming headset' },
      ],
      photography: [
        { name: 'Camera Lens Filter Kit', price: 30, description: 'UV, polarizing, and ND filters' },
        { name: 'Tripod', price: 50, description: 'Stable tripod for smartphones and cameras' },
        { name: 'Ring Light', price: 35, description: 'Perfect for content creation' },
      ],
      cooking: [
        { name: 'Chef Knife', price: 60, description: 'Professional grade chef knife' },
        { name: 'Cast Iron Skillet', price: 40, description: 'Versatile cast iron cookware' },
        { name: 'Knife Sharpener', price: 25, description: 'Keep knives in top condition' },
      ],
      reading: [
        { name: 'E-reader', price: 100, description: 'Lightweight e-reader for books' },
        { name: 'Book Light', price: 20, description: 'LED light for reading in bed' },
        { name: 'Bookshelf', price: 70, description: 'Beautiful wooden bookshelf' },
      ],
      fitness: [
        { name: 'Yoga Mat', price: 30, description: 'Non-slip exercise mat' },
        { name: 'Dumbbells Set', price: 80, description: 'Adjustable weight dumbbells' },
        { name: 'Resistance Bands', price: 25, description: 'Full body workout bands' },
      ],
      art: [
        { name: 'Art Supply Kit', price: 50, description: 'Comprehensive drawing and painting supplies' },
        { name: 'Sketchbook Set', price: 35, description: 'Premium quality sketchbooks' },
        { name: 'Easel Stand', price: 45, description: 'Adjustable wooden easel' },
      ],
      sports: [
        { name: 'Basketball', price: 35, description: 'Official size basketball' },
        { name: 'Soccer Ball', price: 30, description: 'High-quality soccer ball' },
        { name: 'Tennis Racket', price: 75, description: 'Professional tennis racket' },
      ],
      music: [
        { name: 'Wireless Earbuds', price: 80, description: 'Noise-canceling earbuds' },
        { name: 'Bluetooth Speaker', price: 60, description: 'Portable wireless speaker' },
        { name: 'Ukulele', price: 70, description: 'Beginner-friendly ukulele' },
      ],
    };

    let selectedGifts = [];

    for (const interest of interestList) {
      if (giftDatabase[interest]) {
        selectedGifts.push(...giftDatabase[interest]);
      }
    }

    if (selectedGifts.length === 0) {
      selectedGifts = [
        { name: 'Bluetooth Speaker', price: 45, description: 'Portable wireless speaker' },
        { name: 'Phone Stand', price: 15, description: 'Adjustable phone holder' },
        { name: 'USB-C Hub', price: 35, description: 'Multi-port USB hub' },
        { name: 'Power Bank', price: 30, description: '20000mAh portable charger' },
        { name: 'Desk Lamp', price: 50, description: 'LED desk lamp with adjustable brightness' },
      ];
    }

    selectedGifts = selectedGifts
      .filter(gift => gift.price <= budgetNum * 1.2)
      .slice(0, 5)
      .map(gift => ({
        ...gift,
        reason: `Perfect match for ${ageNum} year old interested in ${interestList.join(' and ')}. Within budget at $${gift.price}.`
      }));

    return selectedGifts.length > 0 ? selectedGifts : [
      { name: 'Gift Card', price: 50, description: 'Flexible gift card', reason: 'Let them choose their favorite' },
      { name: 'Smart Watch', price: 100, description: 'Wearable fitness tracker', reason: 'Useful for any age' },
      { name: 'Wireless Earbuds', price: 80, description: 'Noise-canceling earbuds', reason: 'Always popular' },
      { name: 'Portable Speaker', price: 60, description: 'Bluetooth speaker', reason: 'Great for music lovers' },
      { name: 'Phone Case', price: 20, description: 'Protective phone case', reason: 'Practical and stylish' },
    ];
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '40px 20px', fontFamily: "'Lora', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;500;600&display=swap');
        * { font-family: 'Lora', serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '300', letterSpacing: '3px', color: '#ffffff', margin: '0 0 10px 0' }}>
          ✨ GIFT CURATOR ✨
        </h1>
        <p style={{ fontSize: '18px', color: '#b0b0b0', letterSpacing: '2px', fontWeight: '300' }}>
          Discover Exceptional Gifts Tailored to Perfection
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '50px',
          marginBottom: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px', color: '#1a1a2e', letterSpacing: '1px' }}>
              RECIPIENT'S AGE
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              style={{
                padding: '15px 20px',
                width: '100%',
                borderRadius: '8px',
                border: '2px solid #e8d7c3',
                fontSize: '16px',
                boxSizing: 'border-box',
                background: '#fafafa',
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px', color: '#1a1a2e', letterSpacing: '1px' }}>
              GENDER
            </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} style={{
              padding: '15px 20px',
              width: '100%',
              borderRadius: '8px',
              border: '2px solid #e8d7c3',
              fontSize: '16px',
              boxSizing: 'border-box',
              background: '#fafafa',
              cursor: 'pointer'
            }}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px', color: '#1a1a2e', letterSpacing: '1px' }}>
              INTERESTS (comma-separated)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., gaming, photography, cooking"
              style={{
                padding: '15px 20px',
                width: '100%',
                borderRadius: '8px',
                border: '2px solid #e8d7c3',
                fontSize: '16px',
                boxSizing: 'border-box',
                background: '#fafafa'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px', color: '#1a1a2e', letterSpacing: '1px' }}>
              BUDGET (USD)
            </label>
            <input
              type="number"
              min="0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="100"
              style={{
                padding: '15px 20px',
                width: '100%',
                borderRadius: '8px',
                border: '2px solid #e8d7c3',
                fontSize: '16px',
                boxSizing: 'border-box',
                background: '#fafafa'
              }}
            />
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            padding: '18px 40px',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #d4a574 0%, #c19a6b 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? '⏳ DISCOVERING GIFTS...' : '✨ REVEAL GIFTS'}
          </button>
        </div>

        {error && (
          <div style={{
            color: '#c0392b',
            fontSize: '16px',
            padding: '20px',
            backgroundColor: 'rgba(192, 57, 43, 0.1)',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid rgba(192, 57, 43, 0.3)',
          }}>
            {error}
          </div>
        )}

        {gifts.length > 0 && (
          <div>
            <h2 style={{
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '300',
              letterSpacing: '2px',
              marginBottom: '40px',
            }}>
              CURATED SELECTIONS
            </h2>

            {gifts.map((gift, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '35px',
                marginBottom: '25px',
                borderRadius: '15px',
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{
                  color: '#1a1a2e',
                  marginTop: 0,
                  marginBottom: '12px',
                  fontSize: '24px',
                  fontWeight: '600',
                }}>
                  {gift.name}
                </h3>
                <p style={{
                  color: '#666',
                  marginBottom: '15px',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  {gift.description}
                </p>
                <p style={{
                  color: '#d4a574',
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '15px',
                }}>
                  ${gift.price}
                </p>
                <p style={{
                  color: '#555',
                  marginBottom: 0,
                  fontSize: '14px',
                  fontStyle: 'italic',
                  lineHeight: '1.6'
                }}>
                  <strong>Why Perfect:</strong> {gift.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {gifts.length === 0 && !error && (
        <div style={{
          textAlign: 'center',
          marginTop: '80px',
          color: '#b0b0b0',
          fontSize: '14px',
          letterSpacing: '1px',
        }}>
          ✦ Discover the perfect gift in seconds ✦
        </div>
      )}
    </div>
  );
}
