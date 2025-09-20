import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'HEYGEN_API_KEY not configured' },
        { status: 500 }
      );
    }

    console.log('Testing HeyGen API endpoints...');

    // Test avatar list endpoint
    console.log('Testing avatar.list endpoint...');
    const avatarsResponse = await fetch('https://api.heygen.com/v1/streaming/avatar.list', {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('Avatar list response status:', avatarsResponse.status);
    const avatarsText = await avatarsResponse.text();
    console.log('Avatar list raw response:', avatarsText);

    let avatarsData = null;
    try {
      avatarsData = JSON.parse(avatarsText);
    } catch (e) {
      console.error('Failed to parse avatars response:', e);
    }

    // Test streaming.new endpoint
    console.log('Testing streaming.new endpoint...');
    const sessionResponse = await fetch('https://api.heygen.com/v1/streaming.new', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar_id: 'default',
        quality: 'high'
      }),
    });

    console.log('Streaming.new response status:', sessionResponse.status);
    const sessionText = await sessionResponse.text();
    console.log('Streaming.new raw response:', sessionText);

    let sessionData = null;
    try {
      sessionData = JSON.parse(sessionText);
    } catch (e) {
      console.error('Failed to parse session response:', e);
    }

    return NextResponse.json({
      success: true,
      avatars: {
        status: avatarsResponse.status,
        data: avatarsData,
        raw: avatarsText
      },
      session: {
        status: sessionResponse.status,
        data: sessionData,
        raw: sessionText
      }
    });

  } catch (error) {
    console.error('HeyGen API test error:', error);
    return NextResponse.json(
      { 
        error: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error instanceof Error ? error.stack : 'No stack trace available'
      },
      { status: 500 }
    );
  }
}
