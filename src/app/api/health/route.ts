import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`[${requestId}] Health check requested at ${new Date().toISOString()}`);
  
  try {
    // Check environment variables
    const envCheck = {
      HEYGEN_API_KEY: !!process.env.HEYGEN_API_KEY,
      NEXT_PUBLIC_BASE_API_URL: !!process.env.NEXT_PUBLIC_BASE_API_URL,
      NEXT_PUBLIC_HEYGEN_AVATAR_ID: !!process.env.NEXT_PUBLIC_HEYGEN_AVATAR_ID,
    };
    
    const allEnvVarsPresent = Object.values(envCheck).every(Boolean);
    
    // Test HeyGen API connectivity
    let heygenStatus = 'unknown';
    let heygenError = null;
    
    if (process.env.HEYGEN_API_KEY) {
      try {
        const testResponse = await fetch('https://api.heygen.com/v1/streaming/avatar.list', {
          method: 'GET',
          headers: {
            'X-Api-Key': process.env.HEYGEN_API_KEY,
            'Content-Type': 'application/json',
          },
        });
        
        heygenStatus = testResponse.ok ? 'connected' : `error_${testResponse.status}`;
        if (!testResponse.ok) {
          const errorText = await testResponse.text();
          heygenError = errorText.substring(0, 200);
        }
      } catch (error) {
        heygenStatus = 'connection_failed';
        heygenError = error instanceof Error ? error.message : 'Unknown error';
      }
    }
    
    const duration = Date.now() - startTime;
    const healthStatus = allEnvVarsPresent && heygenStatus === 'connected' ? 'healthy' : 'unhealthy';
    
    console.log(`[${requestId}] Health check completed in ${duration}ms - Status: ${healthStatus}`);
    
    return NextResponse.json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
      requestId,
      duration,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        region: process.env.VERCEL_REGION,
      },
      envVars: envCheck,
      heygen: {
        status: heygenStatus,
        error: heygenError,
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    }, {
      status: healthStatus === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Request-ID': requestId,
        'X-Health-Status': healthStatus,
      }
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Health check failed after ${duration}ms:`, error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      requestId,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, {
      status: 500,
      headers: {
        'X-Request-ID': requestId,
        'X-Health-Status': 'error',
      }
    });
  }
}
