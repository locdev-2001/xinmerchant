export const routes = {
    dashboard: '/',
    login: '/login',
    adminAccount: '/admin-account',
    adminAccountCreate: '/admin-account/create',
    adminAccountDetail: (id: string)=> `/admin-account/${id}`,
    support: '/support',
    finance: '/finance'
}