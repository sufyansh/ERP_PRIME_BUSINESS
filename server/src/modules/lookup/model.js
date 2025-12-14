const mongoose = require("mongoose");


const ProductTypeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
export const ProductType = mongoose.model('ProductType', ProductTypeSchema);

// ProductCategory
const ProductCategorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

// HSCode (Harmonized System Code)
const HSCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String },
    fbrApiResponse: { type: mongoose.Schema.Types.Mixed }, // JSON for dynamic response
    uniqueCode: { type: String },
    isBlocked: { type: Boolean, default: false },
});
export const HSCode = mongoose.model('HSCode', HSCodeSchema);

// CountryRegion
const CountryRegionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const CountryRegion = mongoose.model('CountryRegion', CountryRegionSchema);

// Country
const CountrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CountryRegion' }, // FK
    isBlocked: { type: Boolean, default: false },
});
export const Country = mongoose.model('Country', CountrySchema);

// ProductGroup
const ProductGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const ProductGroup = mongoose.model('ProductGroup', ProductGroupSchema);

// ProductSubGroup
const ProductSubGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    productGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup', required: true }, // FK
    isBlocked: { type: Boolean, default: false },
});
export const ProductSubGroup = mongoose.model('ProductSubGroup', ProductSubGroupSchema);

// InventoryUnit
const InventoryUnitSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    decimalAllowed: { type: Boolean, default: true },
    decimalDigits: { type: Number, default: 2 },
    isBlocked: { type: Boolean, default: false },
});
export const InventoryUnit = mongoose.model('InventoryUnit', InventoryUnitSchema);

// Replenishment
const ReplenishmentSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const Replenishment = mongoose.model('Replenishment', ReplenishmentSchema);

// --- 2️⃣ STORAGE & TRACKING ---

// StorageStructure
const StorageStructureSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const StorageStructure = mongoose.model('StorageStructure', StorageStructureSchema);

// TrackingStructure
const TrackingStructureSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const TrackingStructure = mongoose.model('TrackingStructure', TrackingStructureSchema);

// --- 3️⃣ PACKING & VALUATION ---

// PackingGroup
const PackingGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    x1: { type: Number },
    x2: { type: Number },
    x3: { type: Number },
    x4: { type: Number },
    x5: { type: Number },
    totalQuantity: { type: Number, required: true, default: 0 }, // Calculated but stored
    isBlocked: { type: Boolean, default: false },
});

// Pre-save hook to calculate totalQuantity
PackingGroupSchema.pre('save', function(next) {
    this.totalQuantity = (this.x1 || 0) * (this.x2 || 0) * (this.x3 || 0) * (this.x4 || 0) * (this.x5 || 0);
    next();
});

export const PackingGroup = mongoose.model('PackingGroup', PackingGroupSchema);

// ProductValuationMethod
const ProductValuationMethodSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    inventoryMethodTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryMethodType' }, // Assuming a separate InventoryMethodType table
    isBlocked: { type: Boolean, default: false },
});
export const ProductValuationMethod = mongoose.model('ProductValuationMethod', ProductValuationMethodSchema);

// --- 4️⃣ ACCOUNTING / GL STRUCTURE ---

// AccountNature
const AccountNatureSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    financialStatement: {
        type: String,
        enum: ['IncomeStatement', 'BalanceSheet'],
        required: true
    },
});
export const AccountNature = mongoose.model('AccountNature', AccountNatureSchema);

// AccountCategory
const AccountCategorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    accountNatureId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountNature', required: true }, // FK
});
export const AccountCategory = mongoose.model('AccountCategory', AccountCategorySchema);

// ChartOfAccount (GLAccount)
const GLAccountSchema = new mongoose.Schema({
    accountNatureId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountNature', required: true },
    accountCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountCategory', required: true },
    subCategoryName: { type: String },
    distinctNumber: { type: Number },
    codeLength: { type: Number },
    glAccountFrom: { type: String },
    glAccountTo: { type: String },
    // A proper GL should also have a unique 'code' field typically built from these components,
    // but the schema only lists the components, so we will keep it as is.
});
export const GLAccount = mongoose.model('GLAccount', GLAccountSchema);

// ProductGLPosting
const ProductGLPostingSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
    glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'GLAccount' },
    isBlocked: { type: Boolean, default: false },
});
export const ProductGLPosting = mongoose.model('ProductGLPosting', ProductGLPostingSchema);

// --- 5️⃣ SALES STRUCTURE ---

// SalesOrganization
const SalesOrganizationSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const SalesOrganization = mongoose.model('SalesOrganization', SalesOrganizationSchema);

// SalesGroup
const SalesGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const SalesGroup = mongoose.model('SalesGroup', SalesGroupSchema);

// SalesRegion
const SalesRegionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const SalesRegion = mongoose.model('SalesRegion', SalesRegionSchema);

// SalesArea
const SalesAreaSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    salesRegionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRegion', required: true },
    isBlocked: { type: Boolean, default: false },
});
export const SalesArea = mongoose.model('SalesArea', SalesAreaSchema);

// SalesTerritory
const SalesTerritorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    salesAreaId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesArea', required: true },
    isBlocked: { type: Boolean, default: false },
});
export const SalesTerritory = mongoose.model('SalesTerritory', SalesTerritorySchema);

// --- 6️⃣ PURCHASING ---

// PurchaseOrganization
const PurchaseOrganizationSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const PurchaseOrganization = mongoose.model('PurchaseOrganization', PurchaseOrganizationSchema);

// PurchaseGroup
const PurchaseGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const PurchaseGroup = mongoose.model('PurchaseGroup', PurchaseGroupSchema);

// PurchaseBudgetGroup
const PurchaseBudgetGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const PurchaseBudgetGroup = mongoose.model('PurchaseBudgetGroup', PurchaseBudgetGroupSchema);

// --- 7️⃣ TAX & PRICING ---

// TaxGroup
// Note: Assuming 'TaxCode' is a separate model, which you'd need to define.
const TaxGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    taxCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' }], // Array of FKs
    isBlocked: { type: Boolean, default: false },
});
export const TaxGroup = mongoose.model('TaxGroup', TaxGroupSchema);

// PricingGroup
const PricingGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const PricingGroup = mongoose.model('PricingGroup', PricingGroupSchema);

// --- 8️⃣ MANUFACTURING ---

// ManufacturingUnit
// Note: Assuming 'Site' and 'Warehouse' are separate models, which you'd need to define.
const ManufacturingUnitSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    inputWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    outputWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    isBlocked: { type: Boolean, default: false },
});
export const ManufacturingUnit = mongoose.model('ManufacturingUnit', ManufacturingUnitSchema);

// ManufacturingPool
const ManufacturingPoolSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const ManufacturingPool = mongoose.model('ManufacturingPool', ManufacturingPoolSchema);

// ManufacturingGroup
const ManufacturingGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const ManufacturingGroup = mongoose.model('ManufacturingGroup', ManufacturingGroupSchema);

// --- 9️⃣ VENDOR MANAGEMENT ---

// VendorGroup
// Note: Assuming 'PaymentTerm', 'PaymentMethod', and 'TaxZone' are separate models, and 'GLAccount' is defined above.
const VendorGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'GLAccount' },
    paymentTermId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    taxZoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxZone' },
    isBlocked: { type: Boolean, default: false },
});
export const VendorGroup = mongoose.model('VendorGroup', VendorGroupSchema);

// VendorCategory
const VendorCategorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const VendorCategory = mongoose.model('VendorCategory', VendorCategorySchema);

// --- 🔟 CUSTOMER MANAGEMENT ---

// CustomerGroup
// Note: Assuming 'PaymentTerm', 'PaymentMethod', and 'TaxZone' are separate models, and 'GLAccount' is defined above.
const CustomerGroupSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    glAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'GLAccount' },
    paymentTermId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    taxZoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxZone' },
    isBlocked: { type: Boolean, default: false },
});
export const CustomerGroup = mongoose.model('CustomerGroup', CustomerGroupSchema);

// CustomerCategory
const CustomerCategorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
export const CustomerCategory = mongoose.model('CustomerCategory', CustomerCategorySchema);

// --- EXPORT ALL MODELS FOR CONVENIENCE ---
export default {
    ProductType,
    ProductCategory,
    HSCode,
    CountryRegion,
    Country,
    ProductGroup,
    ProductSubGroup,
    InventoryUnit,
    Replenishment,
    StorageStructure,
    TrackingStructure,
    PackingGroup,
    ProductValuationMethod,
    AccountNature,
    AccountCategory,
    GLAccount,
    ProductGLPosting,
    SalesOrganization,
    SalesGroup,
    SalesRegion,
    SalesArea,
    SalesTerritory,
    PurchaseOrganization,
    PurchaseGroup,
    PurchaseBudgetGroup,
    TaxGroup,
    PricingGroup,
    ManufacturingUnit,
    ManufacturingPool,
    ManufacturingGroup,
    VendorGroup,
    VendorCategory,
    CustomerGroup,
    CustomerCategory,
};