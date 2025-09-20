import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`[${requestId}] Starting HeyGen session creation at ${new Date().toISOString()}`);
  
  try {
    const { avatarId, quality = 'high' } = await request.json();
    console.log(`[${requestId}] Request data:`, { avatarId, quality });

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
      console.error(`[${requestId}] HEYGEN_API_KEY is not configured`);
      return NextResponse.json(
        { 
          error: 'Invalid or missing HEYGEN_API_KEY',
          requestId,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    let selectedAvatarId = avatarId || process.env.NEXT_PUBLIC_HEYGEN_AVATAR_ID || 'Thaddeus_ProfessionalLook2_public';

    // If no avatar_id provided, fetch available avatars first
    if (!avatarId && !process.env.NEXT_PUBLIC_HEYGEN_AVATAR_ID) {
      console.log(`[${requestId}] No avatar_id provided, fetching available avatars...`);
      try {
        const avatarsResponse = await fetch('https://api.heygen.com/v1/streaming/avatar.list', {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (avatarsResponse.ok) {
          const avatarsData = await avatarsResponse.json();
          const avatars = avatarsData.data?.avatars || avatarsData.avatars || [];
          if (avatars.length > 0) {
            selectedAvatarId = avatars[0].avatar_id || avatars[0].id || 'Thaddeus_ProfessionalLook2_public';
            console.log(`[${requestId}] Using first available avatar:`, selectedAvatarId);
          }
        } else {
          console.warn(`[${requestId}] Failed to fetch avatars, using default:`, avatarsResponse.status);
        }
      } catch (error) {
        console.warn(`[${requestId}] Error fetching avatars, using default:`, error);
      }
    }

    console.log(`[${requestId}] Creating HeyGen streaming session for avatar:`, selectedAvatarId, 'quality:', quality);

    // Call streaming.new with correct headers and body format
    console.log(`[${requestId}] Calling streaming.new with X-Api-Key header...`);
    const sessionResponse = await fetch(
      'https://api.heygen.com/v1/streaming.new',
      {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_id: selectedAvatarId,
          quality: quality,
        }),
      }
    );

    console.log(`[${requestId}] HeyGen streaming.new response status:`, sessionResponse.status);
    const sessionText = await sessionResponse.text();
    console.log(`[${requestId}] HeyGen streaming.new raw response:`, sessionText);

    if (!sessionResponse.ok) {
      console.error(`[${requestId}] HeyGen streaming.new API error - Status:`, sessionResponse.status);
      console.error(`[${requestId}] HeyGen streaming.new API error - Response:`, sessionText);
      
      if (sessionResponse.status === 401 || sessionResponse.status === 403) {
        return NextResponse.json(
          { 
            error: 'Invalid or missing HEYGEN_API_KEY',
            requestId,
            timestamp: new Date().toISOString(),
            status: sessionResponse.status
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { 
          error: `HeyGen streaming.new API error: ${sessionResponse.status}`,
          details: sessionText,
          requestId,
          timestamp: new Date().toISOString(),
          status: sessionResponse.status 
        },
        { status: 502 }
      );
    }

    let sessionData;
    try {
      sessionData = JSON.parse(sessionText);
    } catch (e) {
      console.error(`[${requestId}] Failed to parse session response:`, e);
      return NextResponse.json(
        { 
          error: 'Invalid response format from HeyGen API',
          details: sessionText,
          requestId,
          timestamp: new Date().toISOString()
        },
        { status: 502 }
      );
    }

    console.log(`[${requestId}] Parsed HeyGen session response:`, {
      code: sessionData.code,
      hasData: !!sessionData.data,
      hasToken: !!sessionData.data?.token,
      hasSessionId: !!sessionData.data?.session_id,
      realtimeEndpoint: sessionData.data?.realtime_endpoint,
      fullData: sessionData.data
    });

    if (sessionData.code !== 100) {
      console.error(`[${requestId}] HeyGen API returned error code:`, sessionData.code, sessionData.message);
      return NextResponse.json(
        { 
          error: `HeyGen API error: ${sessionData.message || 'Unknown error'}`,
          code: sessionData.code,
          requestId,
          timestamp: new Date().toISOString()
        },
        { status: 502 }
      );
    }

    const { token, session_id, realtime_endpoint } = sessionData.data;
    
    if (!token) {
      console.error(`[${requestId}] No token received from HeyGen session API`);
      return NextResponse.json(
        { 
          error: 'No token received from HeyGen session API',
          requestId,
          timestamp: new Date().toISOString()
        },
        { status: 502 }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Successfully created HeyGen session in ${duration}ms`);

    const responseData = {
      token,
      session_id,
      realtime_endpoint,
      avatar_id: selectedAvatarId,
      quality,
      requestId,
      duration,
      timestamp: new Date().toISOString()
    };
    
    console.log(`[${requestId}] Returning session data:`, responseData);
    
    return NextResponse.json(responseData);

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Error creating HeyGen session after ${duration}ms:`, error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        requestId,
        duration,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
