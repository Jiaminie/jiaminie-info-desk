"use client";

import { Parallax } from "react-scroll-parallax";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Who We Are</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              At Jiaminie.inc, we are dedicated to making you a professional
              website and ensure it reflects your organization&apos;s visions...
            </p>
            <p className="text-lg">
              Our mission spans empowering artisans through Jiamini Kenya and
              supporting education via Jiamini Inc.
            </p>
          </div>
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg shadow-lg">
            {/* Image with a slight parallax effect */}
            <Parallax translateY={[-20, 20]}>
              {" "}
              <Image
                src="https://picsum.photos/1920/1080?random=1"
                alt="Description"
                fill
                className="object-cover"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
