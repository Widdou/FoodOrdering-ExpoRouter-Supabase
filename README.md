
OBS: Check the `expo-secure-store` dependency, it's breaking the Web version of the App

# Food Ordering Application, with React Native Expo + Expo Router + Supabase

[Tutorial de Referencia](https://www.youtube.com/watch?v=rIYzLhkG9TA)

## Concepts to hightlight:
During the development of the application these would be nice concepts or patterns that were implementated:

- Multi-Stack Navigation
  - Having a Tab Navigation contain a Stack Navigation that keeps persistency.
  - Customizing the Header Tab with functionality - (HeaderRight property) `1:37:56`
  - Presentation Mode. Go to a different screen like a modal, slide, etc `1:39:18`

- React Context to share the application's state across components. (Shopping Cart)
- Using Modals

- Implementing an Admin view
  - Routing segments URL of the application to their correct screens `2:23:53`
  - Providing management functionality to the admin screens
  - MENU (Tab): List the Products; Provide the screens to EDIT or ADD new ones
  - ORDERS (Tab): View the Active & Archieved orders; Be able to change the status of the orders `3:26:52`

- Routing the UI into USERS or ADMIN screens based on the UserProfile
  - Getting the Authentication Data from the backend
  - AuthProvider, Context to access the `session` and `profile` data across the app
  - Guard Redirect, prevent users from link-navigating with-in the app
  - 

- Supabase CRUDs
  - 
  - Use React-Query to handle and fetch data from the backend `4:26:22`
  - Propagate a React-Query update after changing data (Usage of queryKey & InvalidateQuery)
  - 
  - Insert Orders at Checkout `5:23:27`
  - Linking Order Items with an Order `5:32:46`
  - Joining Data from Tables on a Request - Get the Products & Order items of and Order `5:43:33`
  - 

- Real-Time Data
  - Subscriptions
  - 

- Storage with Supabase

- Payment integration (Stripe)
  - Setup
  - Payment Intent Creation
  - 

- EAS (Expo Application Services) `7:35:00`

- Remote Push Notifications

-------------------------------------------------------------------------------

## Project Organization:
Having a Task Board on Notion to break down the tasks on each domain phase (Fronted UI, Backend & Production)

[Task Board](https://notjust.notion.site/React-Native-Supabase-Masterclass-47a69a60bc464c399b5a0df4d3c4a630?p=443eaa467dbb47a1b42c2fa8a2d72268&pm=s)

### Dependencies:
- Expo Crypto
- [Day.js (Relative Time)](https://day.js.org/docs/en/plugin/relative-time)
- [Top Navigator Material UI](https://reactnavigation.org/docs/material-top-tab-navigator/) 
- React Query 
- Expo Image Picker
- Expo File System

```shell
npx expo install expo-crypto
npx expo install dayjs

// Top Navigator Material UI
npm install @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-pager-view

// Fetching Data, Invalidating Queries
npx expo install react-query

// Selecting, Uploading and Downloading Pictures
npx expo install expo-file-system base64-arraybuffer
```

-------------------------------------------------------------------------------

Expo Image Picker + Expo File System

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

# Frontend - Expo

# Nice Tricks:

### Top Tab Navigator - Material UI

Top have the navigation bars be displayed on top of the screen, this simple implementation allows to have a stack behave in such a way.
Bonus: Also allows to slide between tabs anywhere on the screen, akin to instagram.
To-do: Search a way to hide the tabs and keep the slide navigation.

`(screen)/_layout.tsx`
```JavaScript
import { withLayoutContext } from "expo-router"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { SafeAreaView } from "react-native-safe-area-context"

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: 'white'}}>
      <TopTabs>
        <TopTabs.Screen name='index' options={{title: 'Active'}}/>
        <TopTabs.Screen name='archive' options={{title: 'Archived'}}/>
      </TopTabs>
    </SafeAreaView>
  )  
}
```

### Dismiss Keyboard easily

```JavaScript
// Create a Component to wrap the Screen/App, when pressed it will close any keyboard
const DismissKeyboard = ({ children } : PropsWithChildren) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  );

```

Applying it this way would allow to not handle the behaviour on each InputText with:
```JavaScript 
onBlur={() => Keyboard.dismiss()}
```

```The easiest way is to just wrap the view as a ViewScroll```

```JavaScript
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        ...children
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
```



-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

# Backend - Supabase

Supabase is initially an alternative to Firebase, both are plataforms that provide a Backend as a Service (BaaS)

1. Getting Started
2. Implementing Authentication System
3. Designing a Database
4. Query and Mutate Data
5. Upload Images
6. Real-time Updates

## Getting Started

Create a Project in your Supabase organization, and get the API keys:

URL: `https://sybyzxlremmctfvejcuf.supabase.co`
AnonKey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Ynl6eGxyZW1tY3RmdmVqY3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NTA0NjQsImV4cCI6MjAzODAyNjQ2NH0.7GKQXOQwk-VlmxtsRLFoJCYYTGiV7uYpcPBRw6i2Gwo`

*This is a safe to have public key since the operations against the backend will be perform on a row-level and user-based role.*

Setup a `src/lib/supabase.ts` file to handle the connection between the application and the Supabase backend.

### Dependencies
```bash
npm install @supabase/supabase-js
npm install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
npx expo install expo-secure-store
```


## Authentication with Supabase

Using the supabase client we can handle authentication with their built-in Authentication service. 

With `supabase.auth.signUp` we can just provide the `email` and `password` values in the form to perform a registration against the `Users` table in the Supabase project's Authentication tab

```JavaScript
  import { supabase } from '@/lib/supabase'

  async function signUpWithEmail() {
    setLoading(true)
    const {error} = await supabase.auth.signUp({email, password})

    if(error) Alert.alert(error.message)
    setLoading(false)
  }
```

Likewise, to allow an user to login once registered, we can use `supabase.auth.signInWithPassword`

```JavaScript
  import { supabase } from '@/lib/supabase'

  async function signInWithPassword() {
    setLoading(true)
    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if(error) Alert.alert(error.message)

    if(data) Alert.alert(`Successfully logged in as User: ${data.user?.email}`)
    setLoading(false)
  }
```

## Application Authentication Context Provider

To make use of our sesion in different places, we have to wrap out applciation in our RootLayout.
The configuration we passed to our client definition at `lib/supabase.ts` already sets it to persist and storage it, but we have to facilitate the running app to have accesss to these details.

Create a `providers/AuthProvider.tsx`, which exports the `session` we could get by calling: 
```JavaScript
  const { data: { session } } = await supabase.auth.getSession();
```

To subscribe to session changes set this in the provider as well:
```JavaScript
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
```

## Guard Route Groups - Avoiding Link Navigation to users without logging in

To avoid navigating straight to a link, and bypassing the authentication, our routes need to be guarded.

In the `_layout.tsx` files of each group we can ask for the session state using the `useAuth` hook to check on the Auth Context.
If the session isn't define we redirect them back to the index of the application, which will then re-redirect to the sign-in.

`(users)/_layout.tsx`
```TypeScript
  import { useAuth } from '@/providers/AuthProvider';

  export default Layout () => {
    ...
    const {session} = useAuth()

    
    if(!session) {
      return <Redirect href={'/'}/>
    }
    ...
  }
```

In the case of the `(admin)/_layout.tsx`, to avoid a logged user to reach it:
```TypeScript

  const {isAdmin} = useAuth()

  if(!isAdmin) {
    return <Redirect href={'/'} />
  }

```

## Group Based Navigation - Create Profile Groups to the users

Set up the database schema based on The **User Management Starter** Template from the SQL Editor

After executing the template, we will have a new `profiles` table, that interacts with the `auth.users.id` service, a set of policies and more.
So now, whenever a new user is created it will be also stored in the `profiles` table.

We can add a column `group` to this table to assign them a role. 
Setting its default to `'USER'` so all new users are just at that group.

Inside our `AuthProvider` we now have to also get the profile data from the backend whenever the user logs in.

Now, in the `app/index.tsx` we can have all the checks and redirect users to the rigth set of screens:
- Unauthenticated  → `/sign-in`
- Authenticated
    - Admin → `/(admin)`
    - User → `/(user)`

-------------------------------------------------------------------------------

# TanStack - React Query

```bash
npm i @tanstack/react-query
```


## Wrapping the App with the Context Provider

To utilize (Tan Stack) React-Query within our application it's necessary to wrap it with their context implementation:

`/providers/QueryProvider.tsx`
```TypeScript
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { PropsWithChildren } from 'react';

  const client = new QueryClient();

  export default function QueryProvider({ children }: PropsWithChildren) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  }
```

`src/app/_layout.tsx`
```TypeScript
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <OrderProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen name="cart" options={{ presentation: 'modal', headerShown: false }} />
              </Stack>
            </CartProvider>
          </OrderProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
```



## Usage

The benefit of ReactQuery here is that it already manages the `isLoading` state, so it can be displayed on the UI.
If any error occurs it's already safely stored into the error

Also manages and optimizes the query behind the scenes.

`queryKey` ensures to not double cache the request

```
  const {data, error, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*')

      if(error) {
        throw new Error(error.message)
      }

      return data
    }
  })
```

## Setting up a basic API Consumption

Create an `api` separate folder to hold all the React Query requests, and so to separate the logic from the implementation

### Querying Data (useQuery)


### Mutating Data (useMutation)

const {mutate} : useMutation(fn)


# Supabase CRUD - Products

Start by creating a `products` table
With this schema:
- id (int8)
- created_at (timestamptz) now()
- image (text)  NULLABLE
- name (text)
- price (float)

With the Enable Row Level Security (RLS) option

Create a new policy to allow authenticated users READ operations on the products table. 


## Typing Supabase models

You can download them from the Supabase, or generate them from the CLI

It's better to use the CLI since, if any changes to the database model occur, they will be instantly deployed and update the type defitions on the client.

##### Run the login command to get an access token for the CLI 
```bash
  npx supabase login
```

##### Generate the Database Models Types:
```bash
npx supabase gen types typescript --project-id your_project_id > src/database.types.ts
```
Running this will create a `database.types.ts` file that contains the supabase model for the database schemas.
Describing its tables, columns, relationships, views, or functions present.

Allowing to have TypeScript support while coding to check types and get intellisense suggestions.

##### Supplying the types to the client

`lib/supabase.ts`
```TypeScript
  import { Database } from '../database.types'

  export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
```

##### Defining Type Helpers

Since the complete schema is imported into the type definition, it's better to just reference the definition with a shorthand.
This way if it ever changes it will continue to reference the one source of truth.

Type Helpers Definition:
```TypeScript
import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
``` 

The helpers allow to match the `Database` type defintions, such as:

```TypeScript
  export type Database = {
    public: {
      Tables: {
        products: {
          Row: {
            created_at: string
            id: number
            image: string | null
            name: string
            price: number
          }
        }
        ...
      }
      ...
    }
  }
```


Example of use:
```TypeScript
  type Product = Tables<'products'>

  type ProductListItemProps = {
    product: Tables<'products'>;
  };
```

-------------------------------------------------------------------------------

Create the `orders` & `order_items` tables. 
Create the RLS Policies to allow all authenticated users to perform actions.
Schema:


`onSuccess(data)` will contain the returned object by the `mutateFn` when doing CRUD operations with React Query

### Creating Orders & Storing Order Items

Flow:
1. User selects products on the menu
2. Adds them to the


## Sorting Query Orders by Creation

Bring the newest orders first
```TypeScript
  const {data, error} = await supabase
    .from('orders')
    .select('*')
    .in('status', statuses)
    .order('created_at', { ascending: false})
```

## Joining Data from Tables on a Request - Get the Products & Order items of and Order 

`5:43:33`
You can make a JOIN request by passing modifierst to the `.select()` function

In this case we want to get the Orders, but also to contain their OrderItems and along those the Products information for eact order item.
To accomplish that we would have to query the information like this:

```TypeScript
  const {data, error} = await supabse
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq()
    .single()
```

`.select('*, order_items(*, products(*))')`
This means to join the `ORDERS` table with `ORDER_ITEMS` and it with `PRODUCTS`

Allowing to return an object with this shape:
```TypeScript
const data: {
    created_at: string;
    id: number;
    status: string;
    total: number | null;
    user_id: string | null;
    order_items: {
        created_at: string;
        id: number;
        order_id: number | null;
        product_id: number | null;
        quantity: number | null;
        size: string | null;
        products: {
            ...;
        } | null;
    }[];
}[]
```

On the `OrderItemListItem.tsx` component that displays the OrderItem information at the Order Details view, the prop type can be updated this way to allow the joined data

```TypeScript
  type OrderItemListItemProps = {
    item: { products: Tables<'products'> } & Tables<'orders'> 
  };
```

-------------------------------------------------------------------------------

# Real-Time Data Updates on Table changes with Supabase

`5:50:00`

```
So far, our data is being fetched when we navigate to a screen. However, if the items are being updated in the database, we won’t know it until we refresh the application. 

Sometimes, it’s important to update the user as soon as changes happen. 

For that, we have subscriptions wich allows us to subscribe to data updates, and when particular events happen, such as a new item being added, updated, deleted, etc, we update the UI of our app to reflect the updates.

In this lesson we will listen to 2 events:

- On admin side, as soon as a new order is created in the database, we will display it in the list
- On user side, when order status updates, we need to update the ui
```

To be able to get data refreshed when it changes without needing for it to be reloading the screen or application.
For this to happen first enable the `Real Time` updates in a Table that you need it.

What this does is broadcast changes to the authorized subscribers to receive them.

With the Supabase API _(It's quickly available from the Table Editor view, with its snippets)_ you can subscribe from the application to the changes.

In the case of this application, we want to subscribe to Order changes, so we will implement it at the Orders tab index. `(admin)/orders/list/index.tsx`

```TypeScript
  const queryClient = useClientQuery()

  // Subscribe to ORDERS table change events in Real-Time
  useEffect(() => {
    const ordersSubscription = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        queryClient.invalidateQueries({queryKey: ['orders']}) // This will force the queries with key 'orders' to re-run
      }
    )
    .subscribe()
  }, [])
```

The idea is to subscribe to them as soon as the screen mounts, so for that we will use an `useEffect()` hook
This way what we can do to refresh data within the application is to use the TanStack React Query functionalities, to invalidate previous queries.

That will force the queries to re-run by observing the changes subscribed here.

Get the `useQueryClient()` hook to run when a new payload is received and invalidate the queries.
The approach with ReactQuery saves us from having to store the `payload` into a state and manually updating everywhere the statuses.
Here the payload only gets the new information, while invalidating the queries will re-fetch all new information.

OBS: Whenever we're subscribing to changes, we also have to **UNSUBSCRIBE** from them when we don't need it anymore.
Cleanup function that will unsubscribe from the real-time channel when the component using this hook unmounts. 
This prevents memory leaks and ensures that you don’t keep receiving updates for a component that’s no longer in the DOM.
```TypeScript
    const ordersSubscription = supabase.channel('custom-insert-channel')
      ...
      ...

    return ordersSubscription.unsubscribe() // Clean-up Function
```

### Subscriptions Architecture

To better organize the Subscriptions, store this snippet in a `api/orders/subscriptions.ts` file as a custom hook.

 * This custom hook subscribes to real-time changes (insertions) in the orders table in your Supabase database. 
 * When a new order is inserted, it logs the change and invalidates the related React Query cache, triggering a refetch to update the data. 
 * The subscription is cleaned up when the component unmounts to prevent memory leaks.


-------------------------------------------------------------------------------

# Storage - Uploading and Rendering Images to a Supabase Bucket

Start by creating a space to store these images. That will be a Supabase Bucket.
Create a `product-images` new bucket, it can be set as `public` or `private`.
If set to `private` setup the policies to allow the authenticated users to INSERT & SELECT from it.

<details>
  <summary>Configuration on the Supabase Policy Panel:</summary>
  
  * Create a new Policy: `Allow authenticated users to read and insert product images`
  * Set the allowed operations to: `SELECT` & `INSERT`
  * Target roles: `Authenticated`
  * Policy definition: `bucket_id = 'product_images'`

</details>

With `Expo File System` plugin we can handle the interaction with the files in the user device.

```bash
npx expo install expo-file-system base64-arraybuffer
```

## Uploading Images



```TypeScript

  import { supabase } from '@/lib/supabase'
  import { decode } from 'base64-arraybuffer'

  import * as FileSystem from 'expo-file-system'
  import { randomUUID } from 'expo-crypto'

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }

    if(error) {return console.error(`Couldn't upload image. ${error.message}`)}
  };
```

## Downloading Images from the Storage

The images will properly be uploaded to the storage, but to have them be rendered in the application it's necessary to download them as well


## Rendering Images

With the ``<RemoteImage/>`` component we can handle the request of an image file from its URI string, and if not found simply display the fallback image.

```TypeScript
  <RemoteImage
    fallback={defaultPizzaImage}
    path={product.image}
    style={styles.image}
    resizeMode="contain"
  />
```
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------


# Supabase CLI - Local Development

Since Supabase is open-source you can set it up and host it locally.
https://supabase.com/docs/guides/cli/local-development

<summary>
<details>Why develop locally?</details>

* Faster Development: 
  Developing locally allows you to work without any network latency or internet disruptions.

* Easier Collaboration: 
  Developing locally can make it easier to collaborate with others on the same project.

* Cost-Effective: 
  Supabase provides a generous Free Plan and gives you two free projects to get started. But what if you need more than two? When you develop locally, you can spin up unlimited local projects and link them with live projects when you're ready to launch.

* Configuration in code: 
  If you directly change your tables via the Dashboard, none of that gets captured in code. If you follow these local development practices, you'll store all of your table schemas in code.

* Work offline: 
  Need to work from a train? A plane? An automobile? No problem. Developing your project locally allows you to work offline.

</summary>

### Login into Supabase from the CLI
```shell
npx supabase login
```
Will prompt a browser to input the credentials and go back to the terminal

### Install the Supabase CLI to manage the local instance.

To run locally the Supabase enviroment needs Docker installed.

```shell
npx supabase init
```
This will add a `supabase` folder to the root folder, which will contain the local Supabase environment.

### Bring the schemas and data from the cloud.
```shell
npx supabase link --project-ref
```
To bring the existing schema in the Supabase remote environment using `link` you can specify project to work with.
The `project-ref` can be found at the dashboard/project-settings

It will prompt the database password (can be resetted if forgotten at: `Project Settings/Database`)

```shell
npx supabase db pull
```
This will pull all the changes done to the database, just like when pulling from a remote repository on git.
It will create a new .sql file at `supabase/migrations/` containing the remote schema.





### Run a Dokcer Image to contain the development environment.

```shell
npx supabase start
```

Will download the image and start a Docker container to host and run the Supabase local environment for development.

```shell
npx supabase status
```
















-------------------------------------------------------------------------------

# Stripe - Payments Integration











