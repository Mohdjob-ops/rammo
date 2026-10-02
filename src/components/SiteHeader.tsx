import { Link } from 'expo-router';
import {
  Image,
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
          accessibilityLabel="Romano Kohl home"
          accessibilityRole="link"
          style={({ pressed }) => [
            styles.brandButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={require('../../assets/images/romano-logo.jpeg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Pressable>
      </Link>

      <View style={styles.navigation}>
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.href} asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }) => [
                styles.navigationButton,
                styles.webPointer,
                activePage === item.name && styles.activeNavigationButton,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.navigationText,
                  activePage === item.name && styles.activeNavigationText,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 96,
    paddingHorizontal: 26,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E7EEF4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    boxShadow: '0px 2px 12px rgba(15, 23, 42, 0.04)',
  },

  brandButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  logoImage: {
    width: 220,
    height: 74,
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },

  navigationButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },

  activeNavigationButton: {
    backgroundColor: '#EAF4FF',
    borderWidth: 1,
    borderColor: '#CFE4FF',
  },

  navigationText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  activeNavigationText: {
    color: '#0F4C81',
  },

  pressed: {
    opacity: 0.72,
  },

  webPointer: Platform.select({
    web: {
      cursor: 'pointer',
    },
    default: {},
  }),
});