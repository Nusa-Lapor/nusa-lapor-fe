"use client"

import React from "react";
import { INSTAGRAM_URL, LINKEDIN_URL, TWITTER_URL, YOUTUBE_URL } from "./constant";
import { Twitter } from "@/components/icons/Twitter";
import { Instagram } from "@/components/icons/Instagram";
import { LinkedIn } from "@/components/icons/LinkedIn";
import { Youtube } from "@/components/icons/Youtube";

export const Footer: React.FC = () => {
  return (
    <div className="footer bg-slate-200 py-8 mt-auto w-full">
      <div className="w-full max-w-[1440px] mx-auto h-auto min-h-96 relative">
        
        {/* Mobile layout */}
        <div className="md:hidden p-8 flex flex-col gap-8">
          {/* Social Media Icons */}
          <div className="flex justify-start items-center gap-4">
            <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Twitter className="w-6 h-6" size="24" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Instagram className="w-6 h-6" size="24" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <LinkedIn className="w-6 h-6" size="24" />
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Youtube className="w-6 h-6" size="24" />
            </a>
          </div>
          
          {/* Partner */}
          <div className="flex flex-col gap-3">
            <div className="pb-2">
              <div className="text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Partners Kami</div>
            </div>
            <a href="tel:112" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kontak Darurat Terpusat (112)</div>
            </a>
            <a href="https://jaki.jakarta.go.id/id/" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">JAKI</div>
            </a>
            <a href="https://pemadam.jakarta.go.id" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Pemadam Kebakaran (113)</div>
            </a>
            <a href="https://www.polri.go.id/" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kepolisian RI (119)</div>
            </a>
            <a href="https://www.bmkg.go.id/" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">BMKG</div>
            </a>
            <a href="https://www.pmi.or.id/" target="_blank" rel="noreferrer" className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">PMI Indonesia</div>
            </a>
          </div>
          
          {/* Pelajari Lebih Lanjut */}
          <div className="flex flex-col gap-3">
            <div className="pb-2">
              <div className="text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Pelajari Lebih Lanjut</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Dashboard</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Hotline Darurat</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Help Center</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Manajemen Akun</div>
            </div>
          </div>
          
          {/* About Us */}
          <div className="flex flex-col gap-3">
            <div className="pb-2">
              <div className="text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Mengenai Kami</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Tim Kami</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Visi dan Misi</div>
            </div>
            <div className="h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kebijakan Privasi</div>
            </div>
          </div>
        </div>

        {/* Desktop layout - hidden on mobile */}
        <div className="hidden md:flex p-16 justify-between">

          {/* Social Media Icons */}
          <div className="inline-flex flex-col gap-3 mb-16">
            <div className="inline-flex flex-row justify-start items-center gap-4">
            <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Twitter className="w-6 h-6" size="24" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Instagram className="w-6 h-6" size="24" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <LinkedIn className="w-6 h-6" size="24" />
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="w-6 h-6">
              <Youtube className="w-6 h-6" size="24" />
            </a>
            </div>
          </div>

          {/* Partner */}
          <div data-density="Default" className="w-64 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-start items-start">
              <div className="justify-start text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Partners Kami</div>
            </div>
            <div className="w-full h-4">
              <a href="tel:112" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kontak Darurat Terpusat (112)</div>
              </a>
            </div>
            <div className="w-full h-4">
              <a href="https://jaki.jakarta.go.id/id/" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">JAKI</div>
              </a>
            </div>
            <div className="w-full h-4">
              <a href="https://pemadam.jakarta.go.id" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Pemadam Kebakaran (113)</div>
              </a>
            </div>
            <div className="w-full h-4">
              <a href="https://www.polri.go.id/" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kepolisian RI (119)</div>
              </a>
            </div>
            <div className="w-full h-4">
              <a href="https://www.bmkg.go.id/" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">BMKG</div>
              </a>
            </div>
            <div className="w-full h-4">
              <a href="https://www.pmi.or.id/" target="_blank" rel="noreferrer">
                <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">PMI Indonesia</div>
              </a>
            </div>
          </div>
          
          {/* Pelajari Lebih Lanjut */}
          <div data-density="Default" className="w-64 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-start items-start">
              <div className="justify-start text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Pelajari Lebih Lanjut</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Dashboard</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Hotline Darurat</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Help Center</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Manajemen Akun</div>
            </div>
          </div>

          {/* About Us */}
          <div data-density="Default" className="w-64 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-start items-start">
              <div className="justify-start text-Text-Default-Default text-base font-semibold font-['Inter'] leading-snug">Mengenai Kami</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Tim Kami</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Visi dan Misi</div>
            </div>
            <div className="w-full h-4">
              <div className="text-Text-Default-Default text-base font-normal font-['Inter'] leading-snug">Kebijakan Privasi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
