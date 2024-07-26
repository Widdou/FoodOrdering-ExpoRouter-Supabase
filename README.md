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
npx expo install 
npx expo install react-query
```

-------------------------------------------------------------------------------

Expo Image Picker

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

# Frontend - Expo

# Nice Tricks:

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




-------------------------------------------------------------------------------