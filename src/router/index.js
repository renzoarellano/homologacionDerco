import Vue from 'vue'
import Router from 'vue-router'
import ClientList from '@/components/ClientList'
import EditClient from '@/components/EditClient'
import EditContact from '@/components/EditContact'
import EditTestDrive from '@/components/EditTestDrive'
import EditBrand from '@/components/EditBrand'
import ShowClient from '@/components/ShowClient'
import ShowBrand from '@/components/ShowBrand'
import CreateClient from '@/components/CreateClient'
import CreateOffice from '@/components/CreateOffice'
import CreateBrand from '@/components/CreateBrand'
import BrandListClient from '@/components/BrandListClient'
import BrandListOffices from '@/components/BrandListOffices'
import OfficeListByBrand from '@/components/OfficeListByBrand'
import ClientListByBrands from '@/components/ClientListByBrands'
import ContactListByBrands from '@/components/ContactListByBrands'
import TestDrivesListByBrands from '@/components/TestDrivesListByBrands'
import ShowContactByBrand from '@/components/ShowContactByBrand'
import ShowTestDriveByBrand from '@/components/ShowTestDriveByBrand'
import ShowClientByBrand from '@/components/ShowClientByBrand'
import ShowOffice from '@/components/ShowOffice'
import EditOffice from '@/components/EditOffice'
import BrandList from '@/components/BrandList'
import Contacts from '@/components/Contacts'
import TestDrives from '@/components/TestDrives'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UsersList from '@/components/UsersList'
import ShowUser from '@/components/ShowUser'
import EditUser from '@/components/EditUser'
import SupervisorIndex from '@/components/Supervisor/Index'
import SupervisorShowClient from '@/components/Supervisor/ShowClient'
import SupervisorEditClient from '@/components/Supervisor/EditClient'
import SupervisorOffices from '@/components/Supervisor/Offices'
import SupervisorShowOffice from '@/components/Supervisor/ShowOffice'
import SupervisorEditOffice from '@/components/Supervisor/EditOffice'
import SupervisorContacts from '@/components/Supervisor/Contacts'
import SupervisorTestDrives from '@/components/Supervisor/TestDrives'
import SupervisorShowContact from '@/components/Supervisor/ShowContact'
import SupervisorEditContact from '@/components/Supervisor/EditContact'
import SupervisorShowTestDrive from '@/components/Supervisor/ShowTestDrive'
import SupervisorEditTestDrive from '@/components/Supervisor/EditTestDrive'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/brands',
      name: 'BrandList',
      component: BrandList
    },
    {
      path: '/contacts/admin',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/testdrives/admin',
      name: 'TestDrives',
      component: TestDrives
    },
    {
      path: '/',
      redirect: '/clients-by-brands/'
    },
    {
      path: '/clients-by-brands',
      name: 'BrandListClient',
      component: BrandListClient
    },
    {
      path: '/contacts/admin/:brand',
      name: 'ContactListByBrands',
      component: ContactListByBrands
    },
    {
      path: '/testdrives/admin/:brand',
      name: 'TestDrivesListByBrands',
      component: TestDrivesListByBrands
    },
    {
      path: '/contacts/admin/:brand/:id',
      name: 'ShowContactByBrand',
      component: ShowContactByBrand
    },
    {
      path: '/testdrives/admin/:brand/:id',
      name: 'ShowTestDriveByBrand',
      component: ShowTestDriveByBrand
    },
    {
      path: '/clients-by-offices',
      name: 'BrandListOffices',
      component: BrandListOffices
    },
    {
      path: '/clients-by-offices/brand/:slug',
      name: 'OfficeListByBrand',
      component: OfficeListByBrand
    },
    {
      path: '/clients-by-offices/office/show/:id',
      name: 'ShowOffice',
      component: ShowOffice
    },
    {
      path: '/clients-by-offices/office/edit/:id',
      name: 'EditOffice',
      component: EditOffice
    },
    {
      path: '/clients-by-offices/office/add/:slug',
      name: 'CreateOffice',
      component: CreateOffice
    },
    {
      path: '/clients-by-brands/:brand/page/:page',
      name: 'ClientListByBrands',
      component: ClientListByBrands
    },
    {
      path: '/clients-by-brands/:brand/client/show/:id',
      name: 'ShowClientByBrand',
      component: ShowClientByBrand
    },
    {
      path: '/clients-by-brands/:brand/client/edit/:id',
      name: 'EditClient',
      component: EditClient
    },
    {
      path: '/clients-list',
      name: 'ClientList',
      component: ClientList
    },
    {
      path: '/show-client/:id',
      name: 'ShowClient',
      component: ShowClient
    },
    {
      path: '/show-client/:id',
      name: 'ShowClient',
      component: ShowClient
    },
    {
      path: '/brands/brand/:id',
      name: 'ShowBrand',
      component: ShowBrand
    },
    {
      path: '/add-client',
      name: 'CreateClient',
      component: CreateClient
    },
    {
      path: '/brands/add',
      name: 'CreateBrand',
      component: CreateBrand
    },
    {
      path: '/contacts/admin/edit/:brand/:id',
      name: 'EditContact',
      component: EditContact
    },
    {
      path: '/testdrives/admin/edit/:brand/:id',
      name: 'EditTestDrive',
      component: EditTestDrive
    },
    {
      path: '/brands/edit/:id',
      name: 'EditBrand',
      component: EditBrand
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/users-list',
      name: 'UsersList',
      component: UsersList
    },
    {
      path: '/users-list/user/:id',
      name: 'ShowUser',
      component: ShowUser
    },
    {
      path: '/users-list/user/edit/:id',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/client/supervisor/page/1',
      name: 'SupervisorIndex',
      component: SupervisorIndex
    },
    {
      path: '/client/supervisor/page/:page',
      name: 'SupervisorIndex',
      component: SupervisorIndex
    },
    {
      path: '/client/supervisor/show/:id',
      name: 'SupervisorShowClient',
      component: SupervisorShowClient
    },
    {
      path: '/client/supervisor/edit/:id',
      name: 'SupervisorEditClient',
      component: SupervisorEditClient
    },
    {
      path: '/offices/supervisor',
      name: 'SupervisorOffices',
      component: SupervisorOffices
    },
    {
      path: '/offices/supervisor/show/:id',
      name: 'SupervisorShowOffice',
      component: SupervisorShowOffice
    },
    {
      path: '/offices/supervisor/edit/:id',
      name: 'SupervisorEditOffice',
      component: SupervisorEditOffice
    },
    {
      path: '/contacts/supervisor',
      name: 'SupervisorContacts',
      component: SupervisorContacts
    },
    {
      path: '/contacts/supervisor/show/:id',
      name: 'SupervisorShowContact',
      component: SupervisorShowContact
    },
    {
      path: '/contacts/supervisor/edit/:id',
      name: 'SupervisorEditContact',
      component: SupervisorEditContact
    },
    {
      path: '/testdrives/supervisor',
      name: 'SupervisorTestDrives',
      component: SupervisorTestDrives
    },
    {
      path: '/testdrives/supervisor/show/:id',
      name: 'SupervisorShowTestDrive',
      component: SupervisorShowTestDrive
    },
    {
      path: '/testdrives/supervisor/edit/:id',
      name: 'SupervisorEditTestDrive',
      component: SupervisorEditTestDrive
    }
  ]
})
