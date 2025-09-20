import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
      console.error('HEYGEN_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Invalid or missing HEYGEN_API_KEY' },
        { status: 500 }
      );
    }

    console.log('Fetching HeyGen streaming avatars list');

    // Call HeyGen streaming/avatar.list endpoint to get available avatars
    const response = await fetch('https://api.heygen.com/v1/streaming/avatar.list', {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Log response status and raw text for debugging
    console.log('HeyGen avatar.list response status:', response.status);
    const responseText = await response.text();
    console.log('HeyGen avatar.list raw response:', responseText);

    if (!response.ok) {
      console.error('HeyGen avatar.list API error - Status:', response.status);
      console.error('HeyGen avatar.list API error - Response:', responseText);
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'Invalid or missing HEYGEN_API_KEY' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { 
          error: `HeyGen avatar.list API error: ${response.status}`,
          details: responseText,
          status: response.status 
        },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed HeyGen avatar.list response:', data);
    } catch (parseError) {
      console.error('Failed to parse HeyGen avatar.list JSON response:', parseError);
      console.error('Raw response that failed to parse:', responseText);
      return NextResponse.json(
        { 
          error: 'Invalid JSON response from HeyGen avatar.list API',
          details: responseText,
          parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error'
        },
        { status: 502 }
      );
    }

    // Extract avatars from response
    const avatars = data.data?.avatars || data.avatars || [];

    console.log('HeyGen avatars fetched successfully:', {
      count: avatars.length,
      avatars: avatars.map((avatar: any) => ({
        id: avatar.avatar_id || avatar.id,
        name: avatar.avatar_name || avatar.name
      }))
    });

    // Return avatars to frontend
    return NextResponse.json({
      success: true,
      avatars: avatars.map((avatar: any) => ({
        id: avatar.avatar_id || avatar.id,
        name: avatar.avatar_name || avatar.name,
        description: avatar.description || '',
        thumbnail: avatar.thumbnail || ''
      }))
    });

  } catch (error) {
    console.error('HeyGen avatars list fetch error:', error);
    return NextResponse.json(
      { 
        error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error instanceof Error ? error.stack : 'No stack trace available'
      },
      { status: 500 }
    );
  }
}
