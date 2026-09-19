import { Link } from 'expo-router';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type PageName = 'home' | 'menu' | 'about' | 'contact';

type SiteHeaderProps = {
  activePage: PageName;
};

const navigationItems = [
  { name: 'home', label: 'Home', href: '/' },
  { name: 'menu', label: 'Menu', href: '/menu' },
  { name: 'about', label: 'About', href: '/about' },
  { name: 'contact', label: 'Contact', href: '/contact' },
] as const;

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <View style={styles.header}>
      <Link href="/" asChild>
        <Pressable
          accessibilityRole="link"
          style={({ pressed }) => [
            styles.brandButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logo}>Romando Resturant & Coffe</Text>
          <Text style={styles.tagline}>
            Fresh food, trusted service
          </Text>
        </Pressable>
      </Link>

      <View style={styles.navigation}>
        {navigationItems.map((item) => {
          const active = activePage === item.name;

          return (
            <Link key={item.name} href={item.href} asChild>
              <Pressable
                accessibilityRole="link"
                style={({ pressed }) => [
                  styles.navigationButton,
                  styles.webPointer,
                  active && styles.activeNavigationButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.navigationText,
                    active && styles.activeNavigationText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 9999,
    elevation: 20,
    width: '100%',
    minHeight: 100,
    backgroundColor: '#ffffff',
    paddingHorizontal: 42,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e4ebe7',
  },

  brandButton: {
    alignItems: 'flex-start',
  },

  logo: {
    color: '#0b4f7c',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  tagline: {
    color: '#34704d',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },

  navigation: {
    position: 'relative',
    zIndex: 10000,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },

  navigationButton: {
    minHeight: 46,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeNavigationButton: {
    backgroundColor: '#168ee0',
  },

  navigationText: {
    color: '#17221c',
    fontSize: 17,
    fontWeight: '700',
  },

  activeNavigationText: {
    color: '#ffffff',
  },

  pressed: {
    opacity: 0.7,
  },

  webPointer: Platform.select({
    web: {
      cursor: 'pointer',
    },
    default: {},
  }),
});