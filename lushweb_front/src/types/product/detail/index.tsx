export interface ProductOptionProps {
	id: number;
	optionType: string;
	optionDisplayType: string;
	optionHideFlag: string;
	optionName1: string;
	optionName2: string;
	optionName3: string;
	optionPrice: string;
	optionCostPrice: string;
	optionPriceNonmember: string;
	optionStockFlag: string;
	optionStockQuantity: number;
	optionStockCode: string;
	optionStockScheduleDate: string;
	optionStockScheduleText: string;
	optionSoldOutFlag: string;
	optionDisplayFlag: string;
	createdUserId: string;
}

export interface ProductDetailProps {
	manualContent: string | TrustedHTML;
	perfumeBoxText: string | TrustedHTML;
	differentContent: string | TrustedHTML;
	perfurmScent: string | TrustedHTML;
	itemNameEn: string;
	itemName: string;
	itemRange: string;
	itemBannerImage: string | undefined;
	itemImage: string;
	itemCode: string;
	id: number;
	detailContent: string;
	options: ProductOptionProps[];
}
