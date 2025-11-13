export interface InvoiceItem {
  id: string;
  price: {
    id: string;
    type: string;
    active: boolean;
    object: string;
    created: number;
    product: string;
    currency: string;
    livemode: boolean;
    metadata: Record<string, any>;
    nickname?: string | null;
    recurring?: string | null;
    lookup_key?: string | null;
    tiers_mode?: string | null;
    unit_amount: number;
    tax_behavior?: string | null;
    billing_scheme: string;
    custom_unit_amount?: null;
    transform_quantity?: null;
    unit_amount_decimal: string;
  };
  object: string;
  currency: string;
  quantity: number;
  amount_tax: number;
  description: string;
  amount_total: number;
  amount_discount: number;
  amount_subtotal: number;
}