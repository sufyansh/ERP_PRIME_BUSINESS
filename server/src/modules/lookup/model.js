const mongoose = require("mongoose");

/* =========================
   COMMON OPTIONS
========================= */
const options = { timestamps: true };

/* =========================
   PRODUCT
========================= */
const ProductTypeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const ProductType = mongoose.model("ProductType", ProductTypeSchema);

const ProductCategorySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

const ProductGroupSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const ProductGroup = mongoose.model("ProductGroup", ProductGroupSchema);

const ProductSubGroupSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    productGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductGroup",
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const ProductSubGroup = mongoose.model(
  "ProductSubGroup",
  ProductSubGroupSchema
);

/* =========================
   HS CODE
========================= */
const HSCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    description: String,
    uniqueCode: String,
    fbrApiResponse: mongoose.Schema.Types.Mixed,
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const HSCode = mongoose.model("HSCode", HSCodeSchema);

/* =========================
   COUNTRY
========================= */
const CountryRegionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const CountryRegion = mongoose.model("CountryRegion", CountryRegionSchema);

const CountrySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: "CountryRegion" },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const Country = mongoose.model("Country", CountrySchema);

/* =========================
   INVENTORY
========================= */
const InventoryUnitSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    decimalAllowed: { type: Boolean, default: true },
    decimalDigits: { type: Number, default: 2 },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const InventoryUnit = mongoose.model("InventoryUnit", InventoryUnitSchema);

const ReplenishmentSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const Replenishment = mongoose.model("Replenishment", ReplenishmentSchema);

/* =========================
   STORAGE / TRACKING
========================= */
const StorageStructureSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const StorageStructure = mongoose.model(
  "StorageStructure",
  StorageStructureSchema
);

const TrackingStructureSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const TrackingStructure = mongoose.model(
  "TrackingStructure",
  TrackingStructureSchema
);

/* =========================
   PACKING
========================= */
const PackingGroupSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    x1: Number,
    x2: Number,
    x3: Number,
    x4: Number,
    x5: Number,
    totalQuantity: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
  },
  options
);

PackingGroupSchema.pre("save", function (next) {
  this.totalQuantity =
    (this.x1 || 1) *
    (this.x2 || 1) *
    (this.x3 || 1) *
    (this.x4 || 1) *
    (this.x5 || 1);
  next();
});
const PackingGroup = mongoose.model("PackingGroup", PackingGroupSchema);

/* =========================
   ACCOUNTING
========================= */
const AccountNatureSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    financialStatement: {
      type: String,
      enum: ["IncomeStatement", "BalanceSheet"],
      required: true,
    },
  },
  options
);
const AccountNature = mongoose.model("AccountNature", AccountNatureSchema);

const AccountCategorySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    accountNatureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountNature",
      required: true,
    },
  },
  options
);
const AccountCategory = mongoose.model(
  "AccountCategory",
  AccountCategorySchema
);

const GLAccountSchema = new mongoose.Schema(
  {
    accountNatureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountNature",
      required: true,
    },
    accountCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountCategory",
      required: true,
    },
    subCategoryName: String,
    glAccountFrom: String,
    glAccountTo: String,
  },
  options
);
const GLAccount = mongoose.model("GLAccount", GLAccountSchema);

/* =========================
   SALES
========================= */
const SalesOrganizationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const SalesOrganization = mongoose.model(
  "SalesOrganization",
  SalesOrganizationSchema
);

const SalesGroupSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const SalesGroup = mongoose.model("SalesGroup", SalesGroupSchema);

const SalesRegionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const SalesRegion = mongoose.model("SalesRegion", SalesRegionSchema);

const SalesAreaSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    salesRegionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesRegion",
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const SalesArea = mongoose.model("SalesArea", SalesAreaSchema);

const SalesTerritorySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    salesAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesArea",
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  options
);
const SalesTerritory = mongoose.model("SalesTerritory", SalesTerritorySchema);

// ProductValuationMethod
const ProductValuationMethodSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  inventoryMethodTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryMethodType",
  }, // Assuming a separate InventoryMethodType table
  isBlocked: { type: Boolean, default: false },
});
const ProductValuationMethod = mongoose.model(
  "ProductValuationMethod",
  ProductValuationMethodSchema
);

// ProductGLPosting
const ProductGLPostingSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType" },
  glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "GLAccount" },
  isBlocked: { type: Boolean, default: false },
});
const ProductGLPosting = mongoose.model(
  "ProductGLPosting",
  ProductGLPostingSchema
);

// PurchaseOrganization
const PurchaseOrganizationSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const PurchaseOrganization = mongoose.model(
  "PurchaseOrganization",
  PurchaseOrganizationSchema
);

// PurchaseGroup
const PurchaseGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const PurchaseGroup = mongoose.model("PurchaseGroup", PurchaseGroupSchema);

// PurchaseBudgetGroup
const PurchaseBudgetGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const PurchaseBudgetGroup = mongoose.model(
  "PurchaseBudgetGroup",
  PurchaseBudgetGroupSchema
);

const TaxGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  taxCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaxCode" }], // Array of FKs
  isBlocked: { type: Boolean, default: false },
});
const TaxGroup = mongoose.model("TaxGroup", TaxGroupSchema);

// PricingGroup
const PricingGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const PricingGroup = mongoose.model("PricingGroup", PricingGroupSchema);

// ManufacturingUnit
// Note: Assuming 'Site' and 'Warehouse' are separate models, which you'd need to define.
const ManufacturingUnitSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  inputWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
  outputWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
  isBlocked: { type: Boolean, default: false },
});
const ManufacturingUnit = mongoose.model(
  "ManufacturingUnit",
  ManufacturingUnitSchema
);

// ManufacturingPool
const ManufacturingPoolSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const ManufacturingPool = mongoose.model(
  "ManufacturingPool",
  ManufacturingPoolSchema
);

// ManufacturingGroup
const ManufacturingGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const ManufacturingGroup = mongoose.model(
  "ManufacturingGroup",
  ManufacturingGroupSchema
);

// VendorGroup
// Note: Assuming 'PaymentTerm', 'PaymentMethod', and 'TaxZone' are separate models, and 'GLAccount' is defined above.
const VendorGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "GLAccount" },
  paymentTermId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentTerm" },
  paymentMethodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  taxZoneId: { type: mongoose.Schema.Types.ObjectId, ref: "TaxZone" },
  isBlocked: { type: Boolean, default: false },
});
const VendorGroup = mongoose.model("VendorGroup", VendorGroupSchema);

// VendorCategory
const VendorCategorySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const VendorCategory = mongoose.model("VendorCategory", VendorCategorySchema);

// CustomerGroup
// Note: Assuming 'PaymentTerm', 'PaymentMethod', and 'TaxZone' are separate models, and 'GLAccount' is defined above.
const CustomerGroupSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "GLAccount" },
  paymentTermId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentTerm" },
  paymentMethodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  taxZoneId: { type: mongoose.Schema.Types.ObjectId, ref: "TaxZone" },
  isBlocked: { type: Boolean, default: false },
});
const CustomerGroup = mongoose.model("CustomerGroup", CustomerGroupSchema);

// CustomerCategory
const CustomerCategorySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});
const CustomerCategory = mongoose.model(
  "CustomerCategory",
  CustomerCategorySchema
);

/* =========================
   EXPORT (SAME AS PERMISSION)
========================= */
module.exports = {
  ProductType: { Model: ProductType, name: "ProductType" },
  ProductCategory: { Model: ProductCategory, name: "ProductCategory" },
  ProductGroup: { Model: ProductGroup, name: "ProductGroup" },
  ProductSubGroup: { Model: ProductSubGroup, name: "ProductSubGroup" },
  HSCode: { Model: HSCode, name: "HSCode" },
  CountryRegion: { Model: CountryRegion, name: "CountryRegion" },
  Country: { Model: Country, name: "Country" },
  InventoryUnit: { Model: InventoryUnit, name: "InventoryUnit" },
  Replenishment: { Model: Replenishment, name: "Replenishment" },
  StorageStructure: { Model: StorageStructure, name: "StorageStructure" },
  TrackingStructure: { Model: TrackingStructure, name: "TrackingStructure" },
  PackingGroup: { Model: PackingGroup, name: "PackingGroup" },
  AccountNature: { Model: AccountNature, name: "AccountNature" },
  AccountCategory: { Model: AccountCategory, name: "AccountCategory" },
  GLAccount: { Model: GLAccount, name: "GLAccount" },
  SalesOrganization: { Model: SalesOrganization, name: "SalesOrganization" },
  SalesGroup: { Model: SalesGroup, name: "SalesGroup" },
  SalesRegion: { Model: SalesRegion, name: "SalesRegion" },
  SalesArea: { Model: SalesArea, name: "SalesArea" },
  SalesTerritory: { Mode: SalesTerritory, name: "SalesTerritory" },
  ProductValuationMethod: {
    Model: ProductValuationMethod,
    name: "ProductValuationMethod",
  },
  ProductGLPosting: { Model: ProductGLPosting, name: "ProductGLPosting" },
  PurchaseOrganization: {
    Model: PurchaseOrganization,
    name: "PurchaseOrganization",
  },
  PurchaseGroup: { Model: PurchaseGroup, name: "PurchaseGroup" },
  PurchaseBudgetGroup: {
    Model: PurchaseBudgetGroup,
    name: "PurchaseBudgetGroup",
  },
  TaxGroup: { Model: TaxGroup, name: "TaxGroup" },
  PricingGroup: { Model: PricingGroup, name: "PricingGroup" },
  ManufacturingUnit: { Model: ManufacturingUnit, name: "ManufacturingUnit" },
  ManufacturingPool: { Model: ManufacturingPool, name: "ManufacturingPool" },
  ManufacturingGroup: { Model: ManufacturingGroup, name: "ManufacturingGroup" },
  VendorGroup: { Model: VendorGroup, name: "VendorGroup" },
  VendorCategory: { Model: VendorCategory, name: "VendorCategory" },
  CustomerGroup: { Model: CustomerGroup, name: "CustomerGroup" },
  CustomerCategory: { Model: CustomerCategory, name: "CustomerCategory" },
};
