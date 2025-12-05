
import React, { useState, useEffect, useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { BlogPost, SiteContent } from '../../types';
import { DEFAULT_BLOG_IMAGE } from '../../constants';
import { geminiService } from '../../services/geminiService';
import slugify from 'slugify';
import SkeletonCard from '../ui/SkeletonCard';

interface BlogManagerProps {
  onSave: (content: SiteContent) => void;
}

const BlogManager: React.FC<BlogManagerProps> = ({ onSave }) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(siteContent.blogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setBlogPosts(siteContent.blogPosts);
  }, [siteContent.blogPosts]);

  const openAddModal = () => {
    setCurrentPost({
      id: `bp-${Date.now()}`,
      title: '',
      slug: '',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      image: DEFAULT_BLOG_IMAGE,
      excerpt: '',
      content: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setAiError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentPost) {
      if (name === 'title') {
        const newSlug = slugify(value, { lower: true, strict: true });
        setCurrentPost({ ...currentPost, [name]: value, slug: newSlug });
      } else if (name === 'tags') {
        setCurrentPost({ ...currentPost, tags: value.split(',').map((tag) => tag.trim()) });
      } else {
        setCurrentPost({ ...currentPost, [name]: value });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;

    let updatedPosts;
    if (blogPosts.find((p) => p.id === currentPost.id)) {
      updatedPosts = blogPosts.map((p) => (p.id === currentPost.id ? currentPost : p));
    } else {
      updatedPosts = [...blogPosts, currentPost];
    }
    onSave({ ...siteContent, blogPosts: updatedPosts });
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = blogPosts.filter((p) => p.id !== id);
      onSave({ ...siteContent, blogPosts: updatedPosts });
    }
  };

  const handleGenerateContent = async (type: 'excerpt' | 'content' | 'idea') => {
    if (!currentPost) return;
    setAiGenerating(true);
    setAiError(null);
    try {
      let prompt = '';
      let maxOutputTokens = 0;
      if (type === 'excerpt') {
        prompt = `Write a short blog post excerpt (max 50 words) for an article titled "${currentPost.title}".`;
        maxOutputTokens = 80;
      } else if (type === 'content') {
        prompt = `Write a detailed blog post content (max 300 words, in markdown format with paragraphs) for an article titled "${currentPost.title}". Focus on travel-related aspects relevant to the title.`;
        maxOutputTokens = 400;
      } else if (type === 'idea') {
        prompt = `Generate 3 creative blog post titles and a one-sentence summary for a travel agency website.`;
        maxOutputTokens = 200;
      }

      const generatedText = await geminiService.generateContent({ prompt, model: 'gemini-2.5-flash', maxOutputTokens: maxOutputTokens });

      if (type === 'excerpt') {
        setCurrentPost((prev) => (prev ? { ...prev, excerpt: generatedText } : null));
      } else if (type === 'content') {
        setCurrentPost((prev) => (prev ? { ...prev, content: generatedText } : null));
      } else if (type === 'idea') {
        alert('AI Generated Ideas:\n\n' + generatedText);
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      setAiError('Failed to generate content with AI. Please try again.');
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Manage Blog Posts</h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button onClick={openAddModal} className="primary-bg primary-hover-bg">
          Add New Blog Post
        </Button>
        <Button
          onClick={() => handleGenerateContent('idea')}
          loading={aiGenerating}
          disabled={aiGenerating}
          variant="secondary"
          className="accent-bg accent-hover-bg text-white"
        >
          {aiGenerating ? 'Generating Ideas...' : 'Get AI Blog Ideas'}
        </Button>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {blogPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No blog posts found.
                </td>
              </tr>
            )}
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {post.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => openEditModal(post)}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)} className="red-border red-text hover:bg-[var(--color-red-50)] dark:red-border-dark dark:red-text-dark">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentPost?.id ? 'Edit Blog Post' : 'Add New Blog Post'}>
        {currentPost && (
          <form onSubmit={handleSubmit}>
            <Input id="title" label="Title" name="title" value={currentPost.title} onChange={handleChange} required />
            <Input id="slug" label="Slug (Auto-generated)" name="slug" value={currentPost.slug} readOnly className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
            <Input id="author" label="Author" name="author" value={currentPost.author} onChange={handleChange} required />
            <Input id="date" label="Date" name="date" type="date" value={currentPost.date} onChange={handleChange} required />
            <Input id="tags" label="Tags (comma-separated)" name="tags" value={currentPost.tags.join(', ')} onChange={handleChange} />
            <Input id="image" label="Image URL" name="image" value={currentPost.image} onChange={handleChange} required />

            <div className="relative">
              <Textarea id="excerpt" label="Excerpt" name="excerpt" value={currentPost.excerpt} onChange={handleChange} rows={3} required />
              <Button
                type="button"
                onClick={() => handleGenerateContent('excerpt')}
                loading={aiGenerating && currentPost?.excerpt === ''}
                disabled={aiGenerating}
                variant="ghost"
                className="absolute top-0 right-0 mt-8 mr-2 text-sm text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)]"
              >
                {aiGenerating && currentPost?.excerpt === '' ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>

            <div className="relative">
              <Textarea id="content" label="Content (Markdown/HTML)" name="content" value={currentPost.content} onChange={handleChange} rows={10} required />
              <Button
                type="button"
                onClick={() => handleGenerateContent('content')}
                loading={aiGenerating && currentPost?.content === ''}
                disabled={aiGenerating}
                variant="ghost"
                className="absolute top-0 right-0 mt-8 mr-2 text-sm text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)]"
              >
                {aiGenerating && currentPost?.content === '' ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>

            {aiError && <p className="text-red-500 text-sm mt-1">{aiError}</p>}

            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" className="primary-bg primary-hover-bg">
                Save Post
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default BlogManager;