interface FeaturedHealthCheckup {
  id: string;
  heading: string;
  categories: {
    [key: string]: string[];
  };
  props: {
    packages: {
      packageType: string;
      packageName: string;
      packageDisplayName: string;
      packageCode: string;
      description: string;
      discount: number;
      isSponsored: boolean;
      minAge: number;
      maxAge: number;
      gender: string;
      testCount: number;
      consultationCount: number;
      isHomeSampleAvailable: boolean;
      isRadiologyIncluded: boolean;
      isPopular: boolean;
      isCovidTest: boolean;
      cartId: number;
      isPresentInCart: boolean;
      isAvailable: boolean;
      discountInfo: {
        discountPrice: number;
        saleName: string;
        coupon: string;
      };
      isCenterVisitPackage: boolean;
      subCategories: string[];
      instructions: string[];
      tags: {
        topRightTag: string;
        bottomTag: string[];
      };
      fastingHoursText: string;
      reportsTatText: string;
      testsSummary: string[];
      packageId: number;
      priceRange: number;
      price: number;
      estimatedPrice: number;
      contractId: number;
      visitType: string[];
      currentVisitType: string;
    }[]; 
  }[];
}