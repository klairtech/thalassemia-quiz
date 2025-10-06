# Security Guide for Thalassemia Quiz App

## 🔒 Security Architecture

This app implements a secure architecture following Supabase best practices:

### **Client-Side (Browser)**

- ✅ Uses **Anon Key** with Row Level Security (RLS)
- ✅ Limited access through RLS policies
- ✅ No direct database writes from client
- ✅ All sensitive operations go through API routes

### **Server-Side (API Routes)**

- ✅ Uses **Service Role Key** for full database access
- ✅ Validates and sanitizes all inputs
- ✅ Implements rate limiting and error handling
- ✅ Never exposes service role key to client

## 🛡️ Security Measures

### **1. Environment Variables**

```env
# ✅ SAFE for client-side (browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ❌ NEVER expose to client - server-side only
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **2. Row Level Security (RLS)**

Our Supabase schema includes RLS policies:

```sql
-- Allow public read access to quiz questions
CREATE POLICY "Allow public read access to quiz questions" ON quiz_questions
    FOR SELECT USING (true);

-- Allow public insert access to quiz attempts
CREATE POLICY "Allow public insert access to quiz attempts" ON quiz_attempts
    FOR INSERT WITH CHECK (true);

-- Allow public read access to quiz attempts (for leaderboard)
CREATE POLICY "Allow public read access to quiz attempts" ON quiz_attempts
    FOR SELECT USING (true);
```

### **3. API Route Protection**

All database operations go through secure API routes:

- `/api/quiz` - Fetches questions and saves attempts
- `/api/leaderboard` - Fetches leaderboard data
- `/api/translate` - Handles translations

### **4. Input Validation**

All API routes validate inputs:

```typescript
// Example validation in API routes
const { searchParams } = new URL(request.url);
const limit = parseInt(searchParams.get("limit") || "3");

// Validate limit is reasonable
if (limit > 10 || limit < 1) {
  return NextResponse.json({ error: "Invalid limit" }, { status: 400 });
}
```

## 🚨 Security Best Practices

### **DO:**

- ✅ Use anon key for client-side operations
- ✅ Use service role key only in API routes
- ✅ Implement RLS policies
- ✅ Validate all inputs
- ✅ Use HTTPS in production
- ✅ Keep environment variables secure
- ✅ Regular security updates

### **DON'T:**

- ❌ Never expose service role key to client
- ❌ Don't bypass RLS policies
- ❌ Don't trust client-side data
- ❌ Don't store sensitive data in localStorage
- ❌ Don't commit .env files to version control

## 🔐 Production Security Checklist

### **Environment Setup:**

- [ ] Service role key is secure and not exposed
- [ ] All environment variables are set
- [ ] HTTPS is enabled
- [ ] CORS is properly configured

### **Database Security:**

- [ ] RLS policies are enabled
- [ ] Database backups are configured
- [ ] Access logs are monitored
- [ ] Regular security audits

### **Application Security:**

- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies are up to date

## 🛠️ Security Monitoring

### **Recommended Tools:**

- Supabase Dashboard for database monitoring
- Vercel Analytics for performance monitoring
- Google Cloud Console for API usage monitoring

### **Key Metrics to Monitor:**

- API request rates
- Database query performance
- Error rates and types
- Unusual access patterns

## 🚀 Deployment Security

### **Vercel Deployment:**

```bash
# Set environment variables in Vercel dashboard
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add GOOGLE_TRANSLATE_API_KEY
```

### **Environment Variables in Production:**

- Never commit `.env.local` to version control
- Use Vercel's environment variable system
- Rotate keys regularly
- Monitor for unauthorized access

## 📞 Security Incident Response

If you suspect a security breach:

1. **Immediate Actions:**

   - Rotate all API keys
   - Check access logs
   - Review recent changes

2. **Investigation:**

   - Identify the scope of the breach
   - Document the incident
   - Notify affected users if necessary

3. **Prevention:**
   - Update security measures
   - Conduct security audit
   - Implement additional monitoring

## 🔍 Security Testing

### **Manual Testing:**

- Test with invalid inputs
- Try to access restricted endpoints
- Verify RLS policies work correctly
- Check for information leakage

### **Automated Testing:**

- Use tools like OWASP ZAP
- Implement security tests in CI/CD
- Regular dependency vulnerability scans

## 📚 Additional Resources

- [Supabase Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Blood Warriors Security](https://www.bloodwarriors.in) - Reference implementation

---

**Remember:** Security is an ongoing process, not a one-time setup. Regular reviews and updates are essential for maintaining a secure application.
