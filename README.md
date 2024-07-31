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




- Supabase CRUDs
  - Use React-Query to handle and fetch data from the backend

- Real-Time Data
- Payment integration (Stripe)
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

```shell
npx expo install expo-crypto
npx expo install dayjs

// Top Navigator Material UI
npm install @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-pager-view


npx expo install react-query
```

-------------------------------------------------------------------------------

Expo Image Picker

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

This is a safe to have public key since the operations against the backend will be perform on a row-level and user-based role.

Setup a `src/lib/supabase.ts` file to handle the connection between the application and the Supabase backend.

### Dependencies
```bash
npm install @supabase/supabase-js
npm install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
npx expo install expo-secure-store
```




-------------------------------------------------------------------------------