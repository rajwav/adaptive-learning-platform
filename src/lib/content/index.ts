import { TopicContent } from './types';
import { module1Content } from './module1';
import { module2Content } from './module2';

export const topicContent: Record<string, TopicContent> = {
  ...module1Content,
  ...module2Content,
};

export const getTopicContent = (topicId: string): TopicContent => {
  return topicContent[topicId] || { hasContent: false, overview: '', formal: '', intuition: '' };
};
