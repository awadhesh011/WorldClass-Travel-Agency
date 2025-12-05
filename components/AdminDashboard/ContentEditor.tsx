
import React, { useState, useEffect, useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { SiteContent } from '../../types';

interface ContentEditorProps {
  onSave: (content: SiteContent) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onSave }) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [editableContent, setEditableContent] = useState<SiteContent>(siteContent);

  useEffect(() => {
    setEditableContent(siteContent);
  }, [siteContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle nested properties for hero, cta, contact etc.
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setEditableContent((prev) => ({
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [field]: value,
        },
      }));
    } else {
      setEditableContent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLinkChange = (index: number, field: keyof (typeof editableContent.headerLinks)[0], value: string) => {
    const newLinks = [...editableContent.headerLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      headerLinks: newLinks,
    }));
  };

  const handleFooterLinkChange = (index: number, field: keyof (typeof editableContent.footerLinks)[0], value: string) => {
    const newLinks = [...editableContent.footerLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      footerLinks: newLinks,
    }));
  };

  const handleWhyChooseUsChange = (index: number, field: keyof (typeof editableContent.whyChooseUs)[0], value: string) => {
    const newItems = [...editableContent.whyChooseUs];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      whyChooseUs: newItems,
    }));
  };

  const handleTestimonialChange = (index: number, field: keyof (typeof editableContent.testimonials)[0], value: string) => {
    const newTestimonials = [...editableContent.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  const handleTeamMemberChange = (index: number, field: keyof (typeof editableContent.about.teamMembers)[0], value: string) => {
    const newTeam = [...editableContent.about.teamMembers];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        teamMembers: newTeam,
      },
    }));
  };

  const handleServiceChange = (index: number, field: keyof (typeof editableContent.services)[0], value: string) => {
    const newServices = [...editableContent.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setEditableContent((prev) => ({
      ...prev,
      services: newServices,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editableContent);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Edit Site Content</h3>
      <form onSubmit={handleSubmit}>
        {/* Hero Section */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Hero Section</h4>
          <Input id="hero.title" label="Hero Title" name="hero.title" value={editableContent.hero.title} onChange={handleChange} />
          <Textarea id="hero.subtitle" label="Hero Subtitle" name="hero.subtitle" value={editableContent.hero.subtitle} onChange={handleChange} rows={3} />
          <Input id="hero.backgroundImage" label="Hero Background Image URL" name="hero.backgroundImage" value={editableContent.hero.backgroundImage} onChange={handleChange} />
          <Input id="hero.searchPlaceholder" label="Search Placeholder" name="hero.searchPlaceholder" value={editableContent.hero.searchPlaceholder} onChange={handleChange} />
        </section>

        {/* Call to Action Section */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Call to Action (CTA) Section</h4>
          <Input id="cta.title" label="CTA Title" name="cta.title" value={editableContent.cta.title} onChange={handleChange} />
          <Textarea id="cta.subtitle" label="CTA Subtitle" name="cta.subtitle" value={editableContent.cta.subtitle} onChange={handleChange} rows={3} />
          <Input id="cta.buttonText" label="CTA Button Text" name="cta.buttonText" value={editableContent.cta.buttonText} onChange={handleChange} />
          <Input id="cta.buttonLink" label="CTA Button Link" name="cta.buttonLink" value={editableContent.cta.buttonLink} onChange={handleChange} />
          <Input id="cta.backgroundImage" label="CTA Background Image URL" name="cta.backgroundImage" value={editableContent.cta.backgroundImage} onChange={handleChange} />
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Why Choose Us Section</h4>
          {editableContent.whyChooseUs.map((item, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`whyChooseUs.${index}.icon`} label={`Item ${index + 1} Icon`} name={`whyChooseUs.${index}.icon`} value={item.icon} onChange={(e) => handleWhyChooseUsChange(index, 'icon', e.target.value)} />
              <Input id={`whyChooseUs.${index}.title`} label={`Item ${index + 1} Title`} name={`whyChooseUs.${index}.title`} value={item.title} onChange={(e) => handleWhyChooseUsChange(index, 'title', e.target.value)} />
              <Textarea id={`whyChooseUs.${index}.description`} label={`Item ${index + 1} Description`} name={`whyChooseUs.${index}.description`} value={item.description} onChange={(e) => handleWhyChooseUsChange(index, 'description', e.target.value)} rows={2} />
            </div>
          ))}
        </section>

        {/* Testimonials Section */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Testimonials Section</h4>
          {editableContent.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`testimonial.${index}.author`} label={`Testimonial ${index + 1} Author`} name={`testimonial.${index}.author`} value={testimonial.author} onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)} />
              <Input id={`testimonial.${index}.location`} label={`Testimonial ${index + 1} Location`} name={`testimonial.${index}.location`} value={testimonial.location} onChange={(e) => handleTestimonialChange(index, 'location', e.target.value)} />
              <Textarea id={`testimonial.${index}.quote`} label={`Testimonial ${index + 1} Quote`} name={`testimonial.${index}.quote`} value={testimonial.quote} onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)} rows={3} />
              <Input id={`testimonial.${index}.avatar`} label={`Testimonial ${index + 1} Avatar URL`} name={`testimonial.${index}.avatar`} value={testimonial.avatar} onChange={(e) => handleTestimonialChange(index, 'avatar', e.target.value)} />
            </div>
          ))}
        </section>

        {/* About Page Content */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">About Page Content</h4>
          <Textarea id="about.companyHistory" label="Company History" name="about.companyHistory" value={editableContent.about.companyHistory} onChange={handleChange} rows={5} />
          <Textarea id="about.mission" label="Mission" name="about.mission" value={editableContent.about.mission} onChange={handleChange} rows={3} />
          <Textarea id="about.vision" label="Vision" name="about.vision" value={editableContent.about.vision} onChange={handleChange} rows={3} />
          <h5 className="text-lg font-medium mt-6 mb-3">Team Members</h5>
          {editableContent.about.teamMembers.map((member, index) => (
            <div key={member.id} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`team.${index}.name`} label={`Member ${index + 1} Name`} name={`team.${index}.name`} value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} />
              <Input id={`team.${index}.role`} label={`Member ${index + 1} Role`} name={`team.${index}.role`} value={member.role} onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)} />
              <Input id={`team.${index}.image`} label={`Member ${index + 1} Image URL`} name={`team.${index}.image`} value={member.image} onChange={(e) => handleTeamMemberChange(index, 'image', e.target.value)} />
              <Textarea id={`team.${index}.bio`} label={`Member ${index + 1} Bio`} name={`team.${index}.bio`} value={member.bio} onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)} rows={3} />
            </div>
          ))}
        </section>

        {/* Services Page Content */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Services Page Content</h4>
          {editableContent.services.map((service, index) => (
            <div key={service.id} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`service.${index}.title`} label={`Service ${index + 1} Title`} name={`service.${index}.title`} value={service.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} />
              <Textarea id={`service.${index}.description`} label={`Service ${index + 1} Description`} name={`service.${index}.description`} value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} rows={3} />
              <Input id={`service.${index}.image`} label={`Service ${index + 1} Image URL`} name={`service.${index}.image`} value={service.image} onChange={(e) => handleServiceChange(index, 'image', e.target.value)} />
            </div>
          ))}
        </section>

        {/* Contact Page Content */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
          <Input id="contact.address" label="Office Address" name="contact.address" value={editableContent.contact.address} onChange={handleChange} />
          <Input id="contact.phone" label="Phone Number" name="contact.phone" value={editableContent.contact.phone} onChange={handleChange} />
          <Input id="contact.email" label="Email Address" name="contact.email" value={editableContent.contact.email} onChange={handleChange} />
          <Input id="contact.mapEmbedUrl" label="Map Embed URL" name="contact.mapEmbedUrl" value={editableContent.contact.mapEmbedUrl} onChange={handleChange} />
        </section>

        {/* Footer Content */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Footer Content</h4>
          <Textarea id="footerDescription" label="Footer Description" name="footerDescription" value={editableContent.footerDescription} onChange={handleChange} rows={3} />
          <h5 className="text-lg font-medium mt-6 mb-3">Social Media Links</h5>
          <Input id="socialMedia.facebook" label="Facebook URL" name="socialMedia.facebook" value={editableContent.socialMedia.facebook} onChange={handleChange} />
          <Input id="socialMedia.instagram" label="Instagram URL" name="socialMedia.instagram" value={editableContent.socialMedia.instagram} onChange={handleChange} />
          <Input id="socialMedia.twitter" label="Twitter (X) URL" name="socialMedia.twitter" value={editableContent.socialMedia.twitter} onChange={handleChange} />
          <Input id="socialMedia.youtube" label="YouTube URL" name="socialMedia.youtube" value={editableContent.socialMedia.youtube} onChange={handleChange} />
        </section>

        {/* Navigation Menu Links */}
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Navigation Menu Links (Header)</h4>
          {editableContent.headerLinks.map((link, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`headerLink.${index}.name`} label={`Link ${index + 1} Name`} name={`headerLink.${index}.name`} value={link.name} onChange={(e) => handleLinkChange(index, 'name', e.target.value)} />
              <Input id={`headerLink.${index}.path`} label={`Link ${index + 1} Path`} name={`headerLink.${index}.path`} value={link.path} onChange={(e) => handleLinkChange(index, 'path', e.target.value)} />
            </div>
          ))}
          <h4 className="text-xl font-semibold mb-4 mt-8">Navigation Menu Links (Footer)</h4>
          {editableContent.footerLinks.map((link, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
              <Input id={`footerLink.${index}.name`} label={`Link ${index + 1} Name`} name={`footerLink.${index}.name`} value={link.name} onChange={(e) => handleFooterLinkChange(index, 'name', e.target.value)} />
              <Input id={`footerLink.${index}.path`} label={`Link ${index + 1} Path`} name={`footerLink.${index}.path`} value={link.path} onChange={(e) => handleFooterLinkChange(index, 'path', e.target.value)} />
            </div>
          ))}
        </section>


        <Button type="submit" className="primary-bg primary-hover-bg">
          Save All Content
        </Button>
      </form>
    </div>
  );
};

export default ContentEditor;