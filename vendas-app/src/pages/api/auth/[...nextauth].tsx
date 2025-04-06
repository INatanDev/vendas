import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: 'Iv23liVyBdn0KEvZVZaj',
      clientSecret: '29d8d3efebc2ae20921b2b4b4081eb658a4c4271',
    }),
    Auth0Provider({
      clientId: 'ZcztlF73Y3wOZEMzkSbzGFflugTSEwfz',
      clientSecret: 'wWY1vraai6pQMHH3jH7FXnHFvxpjqjmDDVmCf3sLb8zxlTe8cMFr_F5O0sGssgdC',
      issuer: 'https://dev-dea8nohjyywmi8x6.us.auth0.com',
    })
  ],
})