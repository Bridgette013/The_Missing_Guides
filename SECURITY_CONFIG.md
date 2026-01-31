# Security Configuration Guide

## API Security Setup

### 1. Environment Variables (Set in Netlify)

Required variables:

```env
# Google Places API Key (required)
GOOGLE_PLACES_API_KEY=your_api_key_here

# Allowed origins for CORS (comma-separated)
# Set to your production domain(s)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Default for development:**
- `http://localhost:3000`
- `http://localhost:8888`

### 2. Google Cloud Console API Key Restrictions

Go to Google Cloud Console → APIs & Services → Credentials → Your Key → Restrictions

**Set the following restrictions:**

#### API Restrictions
- ✅ Restrict key usage to specific APIs
- Select:
  - `Geocoding API`
  - `Places API`

#### HTTP Referrer Restrictions
- ✅ HTTP referrers (web sites)
- Add your domain(s):
  ```
  https://yourdomain.com/*
  https://www.yourdomain.com/*
  ```

#### Quota & Billing
- Set a daily quota limit to prevent unexpected charges
- Monitor usage in API dashboard

### 3. Netlify Function Settings

Environment variables should be set in:
- Netlify Dashboard → Site Settings → Build & Deploy → Environment

Do NOT commit `.env.local` or API keys to version control.

## Security Features Implemented

### Rate Limiting
- Max 20 requests per IP address per 60 seconds
- Returns 429 (Too Many Requests) when exceeded

### CORS Protection
- Only allows requests from specified origins
- Validates origin header before processing
- Rejects requests from unauthorized domains

### Input Validation
- ZIP code format validation (5 digits or 5+4)
- Type checking for all parameters
- Request body size validation

### Error Handling
- Generic error messages (no API key exposure)
- Detailed logging for debugging (server-side only)
- Proper HTTP status codes for different error types

### Request Timeouts
- 10 second timeout on all external API calls
- Prevents hanging requests and resource exhaustion

### HTTP Methods
- Only POST requests allowed
- OPTIONS for CORS preflight
- 405 Method Not Allowed for other methods

## Monitoring & Alerts

### Recommended Monitoring
1. Check Netlify function logs for:
   - Rejected requests (403 Forbidden)
   - Rate limit hits (429)
   - Timeouts (504)

2. Set up alerts for:
   - Spike in request volume
   - Unusual IP patterns
   - High error rates

3. Monitor Google Cloud API usage:
   - Daily quota consumption
   - Geocoding API requests
   - Places API requests

## Testing Security

```bash
# Test invalid ZIP code
curl -X POST https://your-function-url \
  -H "Content-Type: application/json" \
  -d '{"zip":"invalid"}'
# Expected: 400 Bad Request

# Test CORS rejection (from unauthorized origin)
curl -X OPTIONS https://your-function-url \
  -H "Origin: https://attacker.com"
# Expected: 403 Forbidden

# Test rate limiting (run 21 requests in 60 seconds from same IP)
for i in {1..21}; do
  curl -X POST https://your-function-url \
    -H "Content-Type: application/json" \
    -d '{"zip":"12345"}'
done
# Expected: Last request returns 429 Too Many Requests
```

## Production Checklist

- [ ] API key restrictions configured in Google Cloud Console
- [ ] ALLOWED_ORIGINS set to production domain(s)
- [ ] Environment variables deployed to Netlify
- [ ] Function logs monitored for errors
- [ ] Google API quota limit set
- [ ] Rate limit appropriate for expected traffic
- [ ] CORS origin verification working
- [ ] Error logging enabled without sensitive data exposure
