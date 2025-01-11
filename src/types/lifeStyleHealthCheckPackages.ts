// Interface for the Health Check Packages data
interface HealthCheckPackage {
    id: string;
    title: string;
    props: {
      title: string;
      value: string;
      imgSrc: string;
    }[];
  }
  
