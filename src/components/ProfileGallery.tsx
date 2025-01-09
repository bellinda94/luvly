import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProfileGalleryProps {
  images: string[];
  name: string;
}

export const ProfileGallery = ({ images, name }: ProfileGalleryProps) => {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-[3/4] w-full">
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};