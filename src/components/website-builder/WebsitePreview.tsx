
import React, { useState } from 'react';
import { WebsiteData, EditorMode, EditorView } from '@/types/website-builder-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Code, Bot, Smartphone, Tablet, Laptop } from 'lucide-react';
import { ChatbotPreview } from './ChatbotPreview';
import { cn } from '@/lib/utils';

interface WebsitePreviewProps {
  websiteData: WebsiteData;
  isFullScreen?: boolean;
}

export function WebsitePreview({ websiteData, isFullScreen = false }: WebsitePreviewProps) {
  const [viewMode, setViewMode] = useState<EditorView>('preview');
  const [deviceSize, setDeviceSize] = useState<EditorMode>('desktop');
  const [previewTab, setPreviewTab] = useState<'site' | 'chatbot'>('site');
  
  // Calculate preview width based on device size
  const getPreviewWidth = () => {
    switch (deviceSize) {
      case 'desktop': return 'w-full';
      case 'tablet': return 'w-[768px]';
      case 'mobile': return 'w-[375px]';
    }
  };

  const getPreviewHeight = () => {
    return isFullScreen ? 'h-full' : 'h-full';
  };

  return (
    <div className={cn("flex flex-col overflow-hidden", isFullScreen ? "w-full" : "flex-1")}>
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <Tabs 
            value={deviceSize} 
            onValueChange={(value) => setDeviceSize(value as EditorMode)}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center gap-1">
                <Laptop className="h-4 w-4" />
                <span>Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-1">
                <Tablet className="h-4 w-4" />
                <span>Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2">
          {previewTab === 'site' && (
            <>
              <Button
                variant={viewMode === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('preview')}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={viewMode === 'edit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('edit')}
                className="flex items-center"
              >
                <Code className="h-4 w-4 mr-2" />
                Code
              </Button>
            </>
          )}
          {!isFullScreen && (
            <div className="border-l pl-2 ml-2">
              <Tabs value={previewTab} onValueChange={(v) => setPreviewTab(v as 'site' | 'chatbot')}>
                <TabsList>
                  <TabsTrigger value="site">Website</TabsTrigger>
                  <TabsTrigger value="chatbot">
                    <div className="flex items-center gap-1">
                      <Bot className="h-4 w-4" />
                      <span>Chatbot</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
      </div>
      
      <div className={cn(
        "flex-1 overflow-auto bg-gray-100 p-4 flex justify-center",
        isFullScreen ? "p-0" : "p-4"
      )}>
        {previewTab === 'site' ? (
          <div className={cn(
            "bg-white shadow-xl overflow-hidden transition-all duration-300",
            getPreviewWidth(),
            getPreviewHeight(),
            isFullScreen ? "shadow-none" : "shadow-xl"
          )}>
            {viewMode === 'preview' ? (
              <div className="w-full h-full overflow-auto">
                {/* This would be the actual website preview */}
                <div className="relative">
                  {/* Hero Section */}
                  <div className="h-[500px] bg-gray-800 relative">
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {websiteData.template?.name || "Luxury Hotel"} 
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 max-w-3xl">
                        Experience exceptional comfort and service in the heart of the city
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-pms-purple hover:bg-pms-purple/90 text-white font-bold py-3 px-8 rounded">
                          Book Now
                        </button>
                        <button className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-3 px-8 rounded">
                          Explore Rooms
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Domain Name Banner (Full Screen Preview Only) */}
                  {isFullScreen && websiteData.defaultSubdomain && (
                    <div className="bg-pms-purple/10 py-2 px-4 text-center">
                      <p className="text-sm">
                        <span className="font-semibold">Preview Mode:</span> This is how your website will look at{' '}
                        <span className="font-medium">{websiteData.defaultSubdomain}</span>
                      </p>
                    </div>
                  )}

                  {/* Room Section */}
                  <div className="py-16 px-8 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2">Our Rooms</h2>
                    <p className="text-gray-600 mb-8">Choose from our selection of comfortable accommodations</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
                          <div className="h-64 bg-gray-200"></div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Deluxe Room</h3>
                            <p className="text-gray-600 mb-4">
                              Spacious room with king-size bed, city view, and luxury amenities.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold">$199/night</span>
                              <button className="bg-pms-purple hover:bg-pms-purple/90 text-white font-bold py-2 px-4 rounded text-sm">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="py-16 px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                      <h2 className="text-3xl font-bold mb-2">About Our Hotel</h2>
                      <p className="text-gray-600 mb-8">A tradition of excellence since 1985</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                          <p className="text-gray-700 mb-4">
                            Nestled in the heart of the city, our hotel offers a perfect blend of luxury, comfort, and convenience. 
                            With our attentive staff, exquisite dining options, and world-class amenities, we ensure that your 
                            stay with us is nothing short of extraordinary.
                          </p>
                          <p className="text-gray-700 mb-4">
                            Whether you're visiting for business or pleasure, our prime location puts you within easy reach of the city's 
                            major attractions, shopping districts, and business centers.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-pms-purple mr-2"></div>
                              <span>Award-winning restaurant and bar</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-pms-purple mr-2"></div>
                              <span>Luxurious spa and wellness center</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-pms-purple mr-2"></div>
                              <span>24/7 fitness center with modern equipment</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-pms-purple mr-2"></div>
                              <span>Outdoor swimming pool with city views</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-200 h-80 rounded-lg"></div>
                      </div>
                    </div>
                  </div>

                  {/* Other sections would be rendered based on website sections structure */}
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 text-gray-300 p-6 h-full overflow-auto">
                <pre className="text-xs font-mono">
                  {`<!-- Generated website HTML code -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${websiteData.seo.title}</title>
  <meta name="description" content="${websiteData.seo.description}">
  <meta name="keywords" content="${websiteData.seo.keywords.join(', ')}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="main-navigation">
      <div class="logo">
        <h1>${websiteData.template?.name || "Hotel Name"}</h1>
      </div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#rooms">Rooms</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#attractions">Attractions</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div class="book-button">
        <a href="#book" class="btn btn-primary">Book Now</a>
      </div>
    </nav>
    
    <div class="hero" id="home">
      <div class="hero-content">
        <h1>Luxury Hotel Experience</h1>
        <p>Experience exceptional comfort and service</p>
        <div class="hero-buttons">
          <a href="#book" class="btn btn-primary">Book Now</a>
          <a href="#rooms" class="btn btn-outline">Explore Rooms</a>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- Room Section -->
    <section class="rooms-section" id="rooms">
      <div class="container">
        <h2>Our Rooms</h2>
        <p class="section-subtitle">Choose from our selection of comfortable accommodations</p>
        
        <div class="rooms-grid">
          <div class="room-card">
            <div class="room-image"></div>
            <div class="room-details">
              <h3>Deluxe Room</h3>
              <p>Spacious room with king-size bed, city view, and luxury amenities.</p>
              <div class="room-footer">
                <span class="price">$199/night</span>
                <a href="#book" class="btn btn-sm">Book Now</a>
              </div>
            </div>
          </div>
          <!-- More room cards... -->
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
      <div class="container">
        <h2>About Our Hotel</h2>
        <p class="section-subtitle">A tradition of excellence since 1985</p>
        
        <div class="about-grid">
          <div class="about-content">
            <p>Nestled in the heart of the city, our hotel offers a perfect blend of luxury, comfort, and convenience...</p>
            <ul class="features-list">
              <li>Award-winning restaurant and bar</li>
              <li>Luxurious spa and wellness center</li>
              <li>24/7 fitness center with modern equipment</li>
              <li>Outdoor swimming pool with city views</li>
            </ul>
          </div>
          <div class="about-image"></div>
        </div>
      </div>
    </section>

    <!-- More sections... -->

  </main>

  <footer class="site-footer">
    <!-- Footer content... -->
  </footer>

  ${websiteData.chatbotConfig?.enabled ? 
    `<!-- AI Chatbot Integration -->
    <div id="hotel-ai-chatbot" class="chatbot-container">
      <!-- Chatbot will be loaded here -->
    </div>
    <script src="chatbot.js"></script>` : ''}

  <script src="scripts.js"></script>
</body>
</html>`}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full bg-white shadow-xl overflow-hidden">
            {websiteData.chatbotConfig ? (
              <ChatbotPreview config={websiteData.chatbotConfig} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Please configure the chatbot in the settings.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
