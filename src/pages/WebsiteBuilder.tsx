
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { WebsiteBuilderMain } from '@/components/website-builder/WebsiteBuilderMain';

const WebsiteBuilder = () => {
  return (
    <Layout>
      <div className="h-full">
        <h1 className="text-2xl font-bold mb-6">Website Builder</h1>
        <WebsiteBuilderMain />
      </div>
    </Layout>
  );
};

export default WebsiteBuilder;
