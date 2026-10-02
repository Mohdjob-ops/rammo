import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type OrderType = 'pickup' | 'delivery';

type MenuItem = {
  id: number;
  emoji: string;
  name: string;
  description: string;
  price: number;
};

const WHATSAPP_NUMBER = '251908659988';

const menuItems: MenuItem[] = [
  {
    id: 1,
    emoji: '🥗',
    name: 'Fresh Vegetable Salad',
    description:
      'Fresh vegetables, cucumber, tomato and house dressing.',
    price: 180,
  },
  {
    id: 2,
    emoji: '🍔',
    name: 'Classic Beef Burger',
    description:
      'Grilled beef, fresh lettuce, tomato, onion and cheese.',
    price: 320,
  },
  {
    id: 3,
    emoji: '🍗',
    name: 'Grilled Chicken',
    description:
      'Tender grilled chicken served with vegetables and rice.',
    price: 380,
  },
  {
    id: 4,
    emoji: '🍕',
    name: 'Vegetable Pizza',
    description:
      'Cheese, tomato, onion, green pepper and fresh herbs.',
    price: 350,
  },
  {
    id: 5,
    emoji: '🍝',
    name: 'Pasta Special',
    description:
      'Fresh pasta served with our rich homemade tomato sauce.',
    price: 300,
  },
  {
    id: 6,
    emoji: '☕',
    name: 'Ethiopian Coffee',
    description:
      'Freshly prepared traditional Ethiopian coffee.',
    price: 80,
  },
];

const money = (value: number) => `${value} ETB`;

export default function MenuPage() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<OrderType>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const selectedItems = useMemo(
    () =>
      menuItems
        .filter((item) => cart[item.id] && cart[item.id] > 0)
        .map((item) => ({
          ...item,
          quantity: cart[item.id],
        })),
    [cart]
  );

  const itemCount = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function updateQuantity(itemId: number, change: number) {
    setStatus(null);
    setCart((currentCart) => {
      const currentQuantity = currentCart[itemId] ?? 0;
      const nextQuantity = currentQuantity + change;

      if (nextQuantity <= 0) {
        const updatedCart = { ...currentCart };
        delete updatedCart[itemId];
        return updatedCart;
      }

      return {
        ...currentCart,
        [itemId]: nextQuantity,
      };
    });
  }

  function removeFromCart(itemId: number) {
    setStatus(null);
    setCart((currentCart) => {
      const updatedCart = { ...currentCart };
      delete updatedCart[itemId];
      return updatedCart;
    });
  }

  async function handleSubmitOrder() {
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();
    const cleanAddress = deliveryAddress.trim();

    if (itemCount === 0) {
      const message = 'Please add at least one item to your cart before ordering.';
      setStatus({ type: 'error', message });
      if (Platform.OS !== 'web') {
        Alert.alert('Empty cart', message);
      }
      return;
    }

    if (!cleanName || cleanName.length < 2) {
      const message = 'Please enter your full name before placing the order.';
      setStatus({ type: 'error', message });
      if (Platform.OS !== 'web') {
        Alert.alert('Missing name', message);
      }
      return;
    }

    const phonePattern = /^[+]?[\d\s\-()]{7,20}$/;

    if (!phonePattern.test(cleanPhone)) {
      const message = 'Please enter a valid phone number.';
      setStatus({ type: 'error', message });
      if (Platform.OS !== 'web') {
        Alert.alert('Invalid phone number', message);
      }
      return;
    }

    if (deliveryType === 'delivery' && !cleanAddress) {
      const message = 'Please enter a delivery address for delivery orders.';
      setStatus({ type: 'error', message });
      if (Platform.OS !== 'web') {
        Alert.alert('Delivery address required', message);
      }
      return;
    }

    const orderLines = selectedItems.map(
      (item) =>
        `- ${item.name} x${item.quantity} (${money(item.price)} each)`
    );

    const messageLines = [
      'Hello Romano Kohl,',
      '',
      'I would like to place an order.',
      '',
      `Customer name: ${cleanName}`,
      `Phone number: ${cleanPhone}`,
      `Order type: ${deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}`,
      ...(deliveryType === 'delivery'
        ? [`Delivery address: ${cleanAddress}`]
        : []),
      '',
      'Order details:',
      ...orderLines,
      '',
      `Estimated subtotal: ${money(subtotal)}`,
      ...(note.trim() ? [`Note: ${note.trim()}`] : []),
      '',
      'Please confirm availability and the final total. Thank you.',
    ];

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(messageLines.join('\n'))}`;

    try {
      await Linking.openURL(whatsappUrl);
      setStatus({
        type: 'success',
        message:
          'WhatsApp opened. Please review the message and send it to confirm your order.',
      });
      setCart({});
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryType('pickup');
      setDeliveryAddress('');
      setNote('');
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to open WhatsApp. Please try again.',
      });
      if (Platform.OS !== 'web') {
        Alert.alert('WhatsApp unavailable', 'Unable to open WhatsApp.');
      }
    }
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/')}
          style={({ pressed }) => [
            styles.brandButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logo}>Romano Kohl</Text>
          <Text style={styles.logoSubtitle}>
            Fresh food, trusted service
          </Text>
        </Pressable>

        <View style={styles.navigation}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Home</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/menu')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.activeNavigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.navigationText,
                styles.activeNavigationText,
              ]}
            >
              Menu
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/about')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>About</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/contact')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Contact</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.badge}>FRESH • HEALTHY • DELICIOUS</Text>
        <Text style={styles.title}>Our Menu</Text>
        <Text style={styles.subtitle}>
          Choose from our freshly prepared meals and drinks.
        </Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item) => {
          const quantity = cart[item.id] ?? 0;

          return (
            <View key={item.id} style={styles.menuCard}>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.itemPrice}>{money(item.price)}</Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Decrease ${item.name} quantity`}
                      onPress={() => updateQuantity(item.id, -1)}
                      style={({ pressed }) => [
                        styles.quantityButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.quantityValue}>{quantity}</Text>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Increase ${item.name} quantity`}
                      onPress={() => updateQuantity(item.id, 1)}
                      style={({ pressed }) => [
                        styles.quantityButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.orderPanel}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Your order</Text>
          <Text style={styles.orderBadge}>{itemCount} items</Text>
        </View>

        {selectedItems.length === 0 ? (
          <Text style={styles.emptyCartText}>
            Your cart is empty. Select items from the menu to begin.
          </Text>
        ) : (
          <View style={styles.orderList}>
            {selectedItems.map((item) => (
              <View key={item.id} style={styles.orderItemRow}>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemMeta}>
                    {money(item.price)} each
                  </Text>
                </View>

                <View style={styles.orderItemActions}>
                  <View style={styles.inlineQuantityRow}>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => updateQuantity(item.id, -1)}
                      style={({ pressed }) => [
                        styles.inlineQuantityButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.inlineQuantityText}>−</Text>
                    </Pressable>

                    <Text style={styles.inlineQuantityValue}>{item.quantity}</Text>

                    <Pressable
                      accessibilityRole="button"
                      onPress={() => updateQuantity(item.id, 1)}
                      style={({ pressed }) => [
                        styles.inlineQuantityButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.inlineQuantityText}>+</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    accessibilityRole="button"
                    onPress={() => removeFromCart(item.id)}
                    style={({ pressed }) => [
                      styles.removeButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items</Text>
          <Text style={styles.summaryValue}>{itemCount}</Text>
        </View>

        <View style={[styles.summaryRow, styles.finalTotalRow]}>
          <Text style={styles.summaryLabel}>Estimated total</Text>
          <Text style={styles.totalValue}>{money(subtotal)}</Text>
        </View>

        <Text style={styles.sectionLabel}>Choose order type</Text>
        <View style={styles.optionRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setDeliveryType('pickup')}
            style={({ pressed }) => [
              styles.optionButton,
              deliveryType === 'pickup' && styles.optionButtonActive,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                deliveryType === 'pickup' && styles.optionTextActive,
              ]}
            >
              Pickup
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setDeliveryType('delivery')}
            style={({ pressed }) => [
              styles.optionButton,
              deliveryType === 'delivery' && styles.optionButtonActive,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                deliveryType === 'delivery' && styles.optionTextActive,
              ]}
            >
              Delivery
            </Text>
          </Pressable>
        </View>

        {deliveryType === 'delivery' ? (
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Delivery address</Text>
            <TextInput
              value={deliveryAddress}
              onChangeText={(value) => {
                setDeliveryAddress(value);
                setStatus(null);
              }}
              placeholder="Enter your delivery address"
              placeholderTextColor="#8AA0A2"
              style={styles.input}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Your name</Text>
          <TextInput
            value={customerName}
            onChangeText={(value) => {
              setCustomerName(value);
              setStatus(null);
            }}
            placeholder="Enter your full name"
            placeholderTextColor="#8AA0A2"
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Phone number</Text>
          <TextInput
            value={customerPhone}
            onChangeText={(value) => {
              setCustomerPhone(value);
              setStatus(null);
            }}
            placeholder="Enter your phone number"
            placeholderTextColor="#8AA0A2"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Order note (optional)</Text>
          <TextInput
            value={note}
            onChangeText={(value) => {
              setNote(value);
              setStatus(null);
            }}
            placeholder="Any extra details, instructions or allergy notes"
            placeholderTextColor="#8AA0A2"
            style={[styles.input, styles.noteInput]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {status ? (
          <View
            accessibilityRole="alert"
            style={[
              styles.statusBox,
              status.type === 'error' ? styles.errorBox : styles.successBox,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                status.type === 'error' ? styles.errorText : styles.successText,
              ]}
            >
              {status.message}
            </Text>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={handleSubmitOrder}
          style={({ pressed }) => [
            styles.orderButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.orderButtonText}>Order on WhatsApp</Text>
        </Pressable>

        <Text style={styles.orderNote}>
          The restaurant will confirm availability and the final total.
        </Text>
      </View>

      <View style={styles.callToAction}>
        <Text style={styles.callToActionTitle}>
          Ready to place your order?
        </Text>

        <Text style={styles.callToActionText}>
          Contact Romano Kohl and we will help you.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/contact')}
          style={({ pressed }) => [
            styles.contactButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Romano Kohl</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5fbf8',
  },
  content: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    minHeight: 86,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dcebe5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  brandButton: {
    alignItems: 'flex-start',
  },
  logo: {
    color: '#075985',
    fontSize: 24,
    fontWeight: '800',
  },
  logoSubtitle: {
    marginTop: 3,
    color: '#16845b',
    fontSize: 13,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  navigationButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
  },
  activeNavigationButton: {
    backgroundColor: '#0f766e',
  },
  navigationText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  activeNavigationText: {
    color: '#ffffff',
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 38,
    alignItems: 'center',
    backgroundColor: '#e7f7f0',
  },
  badge: {
    marginBottom: 12,
    color: '#16845b',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    color: '#075985',
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 650,
    marginTop: 12,
    color: '#475569',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
  },
  menuGrid: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 22,
  },
  menuCard: {
    width: 320,
    minHeight: 300,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcebe5',
    borderRadius: 18,
    boxShadow: '0px 5px 12px rgba(15, 118, 110, 0.10)',
    elevation: 3,
  },
  emojiContainer: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dff5ea',
  },
  emoji: {
    fontSize: 66,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  itemName: {
    color: '#075985',
    fontSize: 21,
    fontWeight: '800',
  },
  itemDescription: {
    marginTop: 9,
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
  },
  cardFooter: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemPrice: {
    color: '#16845b',
    fontSize: 19,
    fontWeight: '900',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(15, 118, 110, 0.12)',
  },
  quantityButtonText: {
    color: '#075985',
    fontSize: 20,
    fontWeight: '900',
  },
  quantityValue: {
    minWidth: 20,
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  orderPanel: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 38,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcebe5',
    borderRadius: 24,
    padding: 24,
    boxShadow: '0px 10px 24px rgba(15, 61, 46, 0.05)',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  orderTitle: {
    color: '#0f3d2e',
    fontSize: 28,
    fontWeight: '900',
  },
  orderBadge: {
    color: '#0f766e',
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '800',
  },
  emptyCartText: {
    marginTop: 14,
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  orderList: {
    marginTop: 18,
    gap: 12,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  orderItemMeta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 13,
  },
  orderItemActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  inlineQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 8,
  },
  inlineQuantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineQuantityText: {
    color: '#075985',
    fontSize: 18,
    fontWeight: '900',
  },
  inlineQuantityValue: {
    minWidth: 18,
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF1F1',
  },
  removeButtonText: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: '800',
  },
  summaryRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  summaryLabel: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '700',
  },
  summaryValue: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
  },
  finalTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14,
    marginTop: 12,
  },
  totalValue: {
    color: '#0f766e',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionLabel: {
    marginTop: 24,
    color: '#075985',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  optionRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbe8ef',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#ecfdf5',
    borderColor: '#89d7b3',
  },
  optionText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '800',
  },
  optionTextActive: {
    color: '#166534',
  },
  fieldGroup: {
    marginTop: 18,
  },
  fieldLabel: {
    color: '#1f2937',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#d9e3ea',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0f172a',
    fontSize: 15,
  },
  noteInput: {
    minHeight: 110,
  },
  statusBox: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorBox: {
    backgroundColor: '#FFF1F1',
    borderColor: '#E9A5A5',
  },
  successBox: {
    backgroundColor: '#E8F7ED',
    borderColor: '#86C99C',
  },
  statusText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  errorText: {
    color: '#A12B2B',
  },
  successText: {
    color: '#176A35',
  },
  orderButton: {
    marginTop: 22,
    backgroundColor: '#22a06b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 10px 18px rgba(34, 160, 107, 0.2)',
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '900',
  },
  orderNote: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  callToAction: {
    marginHorizontal: 24,
    marginBottom: 48,
    paddingHorizontal: 24,
    paddingVertical: 38,
    alignItems: 'center',
    backgroundColor: '#075985',
    borderRadius: 20,
  },
  callToActionTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  callToActionText: {
    marginTop: 10,
    color: '#dbeafe',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  contactButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: '#22a06b',
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#064e3b',
  },
  footerText: {
    color: '#d1fae5',
    fontSize: 14,
    textAlign: 'center',
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