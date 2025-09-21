'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faHeart, faShare, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from '@/lib/i18n/context'

interface FeatureCardProps {
  iconType: 'ai' | 'hobbies' | 'feed'
  title: string
  desc: string
  href: string
  testId?: string
  cardNumber?: 1 | 2 | 3 // Add card number for background styling
}

export function FeatureCard({ iconType, title, desc, href, testId, cardNumber = 1 }: FeatureCardProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardClass = `feature-card-${cardNumber} enhanced-card`;

  // Map icon types to Font Awesome icons
  const getIcon = () => {
    switch (iconType) {
      case 'ai':
        return faRobot;
      case 'hobbies':
        return faHeart;
      case 'feed':
        return faShare;
      default:
        return faRobot;
    }
  };

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    // Prevent card press animation
    setIsPressed(false);
  };

  const handleLearnMoreMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLearnMoreMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCardClick = () => {
    window.location.href = href;
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <div data-testid={testId}>
      <Card
        className={`
          ${cardClass} p-10 cursor-pointer group h-full rounded-3xl
          card-3d
          bg-transparent
        `}
        onClick={handleCardClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >

        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-2xl font-bold mb-6 transition-colors text-center card-title-3d">
            {title}
          </h3>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="
                w-16 h-16 rounded-full flex items-center justify-center
                icon-3d
                relative overflow-hidden
              ">

              <FontAwesomeIcon
                icon={getIcon()}
                className={`text-2xl relative z-10 ${cardNumber === 1 ? 'text-orange-600' :
                  cardNumber === 2 ? 'text-green-600' :
                    'text-cyan-600'
                  }`}
              />
            </div>
          </div>

          {/* Description Dropdown */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
            }`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
              <p className="text-gray-700 text-base leading-relaxed">
                {desc}
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="flex justify-center">
            <button
              onClick={handleLearnMoreClick}
              onMouseDown={handleLearnMoreMouseDown}
              onMouseUp={handleLearnMoreMouseUp}
              className="
                relative px-8 py-3 rounded-xl font-semibold text-lg
                text-white
                button-3d
                overflow-hidden
                flex items-center gap-2
              "
            >

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"></div>
              <span className="relative z-10 button-text-3d">{t.common.learnMore}</span>
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="text-sm transition-transform duration-200 relative z-10"
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
