/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { CSSProperties, StyleHTMLAttributes } from 'react';
import COLOR from '../../../shared_types/Color';

const DevDashIconInternal = {
  'accessibility-16':
    require('./../../assets/DevDashIcons/accessibility-16.svg').default.src,
  'accessibility-inset-16':
    require('./../../assets/DevDashIcons/accessibility-inset-16.svg').default
      .src,
  'alert-16': require('./../../assets/DevDashIcons/alert-16.svg').default.src,
  'alert-24': require('./../../assets/DevDashIcons/alert-24.svg').default.src,
  'alert-fill-12': require('./../../assets/DevDashIcons/alert-fill-12.svg')
    .default.src,
  'apps-16': require('./../../assets/DevDashIcons/apps-16.svg').default.src,
  'archive-16': require('./../../assets/DevDashIcons/archive-16.svg').default
    .src,
  'archive-24': require('./../../assets/DevDashIcons/archive-24.svg').default
    .src,
  'arrow-both-16': require('./../../assets/DevDashIcons/arrow-both-16.svg')
    .default.src,
  'arrow-both-24': require('./../../assets/DevDashIcons/arrow-both-24.svg')
    .default.src,
  'arrow-down-16': require('./../../assets/DevDashIcons/arrow-down-16.svg')
    .default.src,
  'arrow-down-24': require('./../../assets/DevDashIcons/arrow-down-24.svg')
    .default.src,
  'arrow-down-left-24':
    require('./../../assets/DevDashIcons/arrow-down-left-24.svg').default.src,
  'arrow-down-right-24':
    require('./../../assets/DevDashIcons/arrow-down-right-24.svg').default.src,
  'arrow-left-16': require('./../../assets/DevDashIcons/arrow-left-16.svg')
    .default.src,
  'arrow-left-24': require('./../../assets/DevDashIcons/arrow-left-24.svg')
    .default.src,
  'arrow-right-16': require('./../../assets/DevDashIcons/arrow-right-16.svg')
    .default.src,
  'arrow-right-24': require('./../../assets/DevDashIcons/arrow-right-24.svg')
    .default.src,
  'arrow-switch-16': require('./../../assets/DevDashIcons/arrow-switch-16.svg')
    .default.src,
  'arrow-switch-24': require('./../../assets/DevDashIcons/arrow-switch-24.svg')
    .default.src,
  'arrow-up-16': require('./../../assets/DevDashIcons/arrow-up-16.svg').default
    .src,
  'arrow-up-24': require('./../../assets/DevDashIcons/arrow-up-24.svg').default
    .src,
  'arrow-up-left-24':
    require('./../../assets/DevDashIcons/arrow-up-left-24.svg').default.src,
  'arrow-up-right-24':
    require('./../../assets/DevDashIcons/arrow-up-right-24.svg').default.src,
  'beaker-16': require('./../../assets/DevDashIcons/beaker-16.svg').default.src,
  'beaker-24': require('./../../assets/DevDashIcons/beaker-24.svg').default.src,
  'bell-16': require('./../../assets/DevDashIcons/bell-16.svg').default.src,
  'bell-24': require('./../../assets/DevDashIcons/bell-24.svg').default.src,
  'bell-fill-16': require('./../../assets/DevDashIcons/bell-fill-16.svg')
    .default.src,
  'bell-fill-24': require('./../../assets/DevDashIcons/bell-fill-24.svg')
    .default.src,
  'bell-slash-16': require('./../../assets/DevDashIcons/bell-slash-16.svg')
    .default.src,
  'bell-slash-24': require('./../../assets/DevDashIcons/bell-slash-24.svg')
    .default.src,
  'blocked-16': require('./../../assets/DevDashIcons/blocked-16.svg').default
    .src,
  'blocked-24': require('./../../assets/DevDashIcons/blocked-24.svg').default
    .src,
  'bold-16': require('./../../assets/DevDashIcons/bold-16.svg').default.src,
  'bold-24': require('./../../assets/DevDashIcons/bold-24.svg').default.src,
  'book-16': require('./../../assets/DevDashIcons/book-16.svg').default.src,
  'book-24': require('./../../assets/DevDashIcons/book-24.svg').default.src,
  'bookmark-16': require('./../../assets/DevDashIcons/bookmark-16.svg').default
    .src,
  'bookmark-24': require('./../../assets/DevDashIcons/bookmark-24.svg').default
    .src,
  'bookmark-fill-24':
    require('./../../assets/DevDashIcons/bookmark-fill-24.svg').default.src,
  'bookmark-slash-16':
    require('./../../assets/DevDashIcons/bookmark-slash-16.svg').default.src,
  'bookmark-slash-24':
    require('./../../assets/DevDashIcons/bookmark-slash-24.svg').default.src,
  'bookmark-slash-fill-24':
    require('./../../assets/DevDashIcons/bookmark-slash-fill-24.svg').default
      .src,
  'briefcase-16': require('./../../assets/DevDashIcons/briefcase-16.svg')
    .default.src,
  'briefcase-24': require('./../../assets/DevDashIcons/briefcase-24.svg')
    .default.src,
  'broadcast-16': require('./../../assets/DevDashIcons/broadcast-16.svg')
    .default.src,
  'broadcast-24': require('./../../assets/DevDashIcons/broadcast-24.svg')
    .default.src,
  'browser-16': require('./../../assets/DevDashIcons/browser-16.svg').default
    .src,
  'browser-24': require('./../../assets/DevDashIcons/browser-24.svg').default
    .src,
  'bug-16': require('./../../assets/DevDashIcons/bug-16.svg').default.src,
  'bug-24': require('./../../assets/DevDashIcons/bug-24.svg').default.src,
  'cache-16': require('./../../assets/DevDashIcons/cache-16.svg').default.src,
  'calendar-16': require('./../../assets/DevDashIcons/calendar-16.svg').default
    .src,
  'calendar-24': require('./../../assets/DevDashIcons/calendar-24.svg').default
    .src,
  'check-16': require('./../../assets/DevDashIcons/check-16.svg').default.src,
  'check-24': require('./../../assets/DevDashIcons/check-24.svg').default.src,
  'check-circle-16': require('./../../assets/DevDashIcons/check-circle-16.svg')
    .default.src,
  'check-circle-24': require('./../../assets/DevDashIcons/check-circle-24.svg')
    .default.src,
  'check-circle-fill-12':
    require('./../../assets/DevDashIcons/check-circle-fill-12.svg').default.src,
  'check-circle-fill-16':
    require('./../../assets/DevDashIcons/check-circle-fill-16.svg').default.src,
  'check-circle-fill-24':
    require('./../../assets/DevDashIcons/check-circle-fill-24.svg').default.src,
  'checkbox-16': require('./../../assets/DevDashIcons/checkbox-16.svg').default
    .src,
  'checkbox-24': require('./../../assets/DevDashIcons/checkbox-24.svg').default
    .src,
  'checklist-16': require('./../../assets/DevDashIcons/checklist-16.svg')
    .default.src,
  'checklist-24': require('./../../assets/DevDashIcons/checklist-24.svg')
    .default.src,
  'chevron-down-16': require('./../../assets/DevDashIcons/chevron-down-16.svg')
    .default.src,
  'chevron-down-24': require('./../../assets/DevDashIcons/chevron-down-24.svg')
    .default.src,
  'chevron-left-16': require('./../../assets/DevDashIcons/chevron-left-16.svg')
    .default.src,
  'chevron-left-24': require('./../../assets/DevDashIcons/chevron-left-24.svg')
    .default.src,
  'chevron-right-16':
    require('./../../assets/DevDashIcons/chevron-right-16.svg').default.src,
  'chevron-right-24':
    require('./../../assets/DevDashIcons/chevron-right-24.svg').default.src,
  'chevron-up-16': require('./../../assets/DevDashIcons/chevron-up-16.svg')
    .default.src,
  'chevron-up-24': require('./../../assets/DevDashIcons/chevron-up-24.svg')
    .default.src,
  'circle-16': require('./../../assets/DevDashIcons/circle-16.svg').default.src,
  'circle-24': require('./../../assets/DevDashIcons/circle-24.svg').default.src,
  'circle-slash-16': require('./../../assets/DevDashIcons/circle-slash-16.svg')
    .default.src,
  'circle-slash-24': require('./../../assets/DevDashIcons/circle-slash-24.svg')
    .default.src,
  'clock-16': require('./../../assets/DevDashIcons/clock-16.svg').default.src,
  'clock-24': require('./../../assets/DevDashIcons/clock-24.svg').default.src,
  'cloud-16': require('./../../assets/DevDashIcons/cloud-16.svg').default.src,
  'cloud-24': require('./../../assets/DevDashIcons/cloud-24.svg').default.src,
  'cloud-offline-16':
    require('./../../assets/DevDashIcons/cloud-offline-16.svg').default.src,
  'cloud-offline-24':
    require('./../../assets/DevDashIcons/cloud-offline-24.svg').default.src,
  'code-16': require('./../../assets/DevDashIcons/code-16.svg').default.src,
  'code-24': require('./../../assets/DevDashIcons/code-24.svg').default.src,
  'code-of-conduct-16':
    require('./../../assets/DevDashIcons/code-of-conduct-16.svg').default.src,
  'code-of-conduct-24':
    require('./../../assets/DevDashIcons/code-of-conduct-24.svg').default.src,
  'code-review-16': require('./../../assets/DevDashIcons/code-review-16.svg')
    .default.src,
  'code-review-24': require('./../../assets/DevDashIcons/code-review-24.svg')
    .default.src,
  'code-square-16': require('./../../assets/DevDashIcons/code-square-16.svg')
    .default.src,
  'code-square-24': require('./../../assets/DevDashIcons/code-square-24.svg')
    .default.src,
  'codescan-16': require('./../../assets/DevDashIcons/codescan-16.svg').default
    .src,
  'codescan-24': require('./../../assets/DevDashIcons/codescan-24.svg').default
    .src,
  'codescan-checkmark-16':
    require('./../../assets/DevDashIcons/codescan-checkmark-16.svg').default
      .src,
  'codescan-checkmark-24':
    require('./../../assets/DevDashIcons/codescan-checkmark-24.svg').default
      .src,
  'codespaces-16': require('./../../assets/DevDashIcons/codespaces-16.svg')
    .default.src,
  'codespaces-24': require('./../../assets/DevDashIcons/codespaces-24.svg')
    .default.src,
  'columns-16': require('./../../assets/DevDashIcons/columns-16.svg').default
    .src,
  'columns-24': require('./../../assets/DevDashIcons/columns-24.svg').default
    .src,
  'command-palette-16':
    require('./../../assets/DevDashIcons/command-palette-16.svg').default.src,
  'command-palette-24':
    require('./../../assets/DevDashIcons/command-palette-24.svg').default.src,
  'comment-16': require('./../../assets/DevDashIcons/comment-16.svg').default
    .src,
  'comment-24': require('./../../assets/DevDashIcons/comment-24.svg').default
    .src,
  'comment-discussion-16':
    require('./../../assets/DevDashIcons/comment-discussion-16.svg').default
      .src,
  'comment-discussion-24':
    require('./../../assets/DevDashIcons/comment-discussion-24.svg').default
      .src,
  'commit-24': require('./../../assets/DevDashIcons/commit-24.svg').default.src,
  'container-16': require('./../../assets/DevDashIcons/container-16.svg')
    .default.src,
  'container-24': require('./../../assets/DevDashIcons/container-24.svg')
    .default.src,
  'copilot-16': require('./../../assets/DevDashIcons/copilot-16.svg').default
    .src,
  'copilot-24': require('./../../assets/DevDashIcons/copilot-24.svg').default
    .src,
  'copilot-48': require('./../../assets/DevDashIcons/copilot-48.svg').default
    .src,
  'copilot-96': require('./../../assets/DevDashIcons/copilot-96.svg').default
    .src,
  'copilot-error-16':
    require('./../../assets/DevDashIcons/copilot-error-16.svg').default.src,
  'copilot-warning-16':
    require('./../../assets/DevDashIcons/copilot-warning-16.svg').default.src,
  'copy-16': require('./../../assets/DevDashIcons/copy-16.svg').default.src,
  'copy-24': require('./../../assets/DevDashIcons/copy-24.svg').default.src,
  'cpu-16': require('./../../assets/DevDashIcons/cpu-16.svg').default.src,
  'cpu-24': require('./../../assets/DevDashIcons/cpu-24.svg').default.src,
  'credit-card-16': require('./../../assets/DevDashIcons/credit-card-16.svg')
    .default.src,
  'credit-card-24': require('./../../assets/DevDashIcons/credit-card-24.svg')
    .default.src,
  'cross-reference-16':
    require('./../../assets/DevDashIcons/cross-reference-16.svg').default.src,
  'cross-reference-24':
    require('./../../assets/DevDashIcons/cross-reference-24.svg').default.src,
  'dash-16': require('./../../assets/DevDashIcons/dash-16.svg').default.src,
  'dash-24': require('./../../assets/DevDashIcons/dash-24.svg').default.src,
  'database-16': require('./../../assets/DevDashIcons/database-16.svg').default
    .src,
  'database-24': require('./../../assets/DevDashIcons/database-24.svg').default
    .src,
  'dependabot-16': require('./../../assets/DevDashIcons/dependabot-16.svg')
    .default.src,
  'dependabot-24': require('./../../assets/DevDashIcons/dependabot-24.svg')
    .default.src,
  'desktop-download-16':
    require('./../../assets/DevDashIcons/desktop-download-16.svg').default.src,
  'desktop-download-24':
    require('./../../assets/DevDashIcons/desktop-download-24.svg').default.src,
  'device-camera-16':
    require('./../../assets/DevDashIcons/device-camera-16.svg').default.src,
  'device-camera-video-16':
    require('./../../assets/DevDashIcons/device-camera-video-16.svg').default
      .src,
  'device-camera-video-24':
    require('./../../assets/DevDashIcons/device-camera-video-24.svg').default
      .src,
  'device-desktop-16':
    require('./../../assets/DevDashIcons/device-desktop-16.svg').default.src,
  'device-desktop-24':
    require('./../../assets/DevDashIcons/device-desktop-24.svg').default.src,
  'device-mobile-16':
    require('./../../assets/DevDashIcons/device-mobile-16.svg').default.src,
  'device-mobile-24':
    require('./../../assets/DevDashIcons/device-mobile-24.svg').default.src,
  'diamond-16': require('./../../assets/DevDashIcons/diamond-16.svg').default
    .src,
  'diamond-24': require('./../../assets/DevDashIcons/diamond-24.svg').default
    .src,
  'diff-16': require('./../../assets/DevDashIcons/diff-16.svg').default.src,
  'diff-24': require('./../../assets/DevDashIcons/diff-24.svg').default.src,
  'diff-added-16': require('./../../assets/DevDashIcons/diff-added-16.svg')
    .default.src,
  'diff-ignored-16': require('./../../assets/DevDashIcons/diff-ignored-16.svg')
    .default.src,
  'diff-modified-16':
    require('./../../assets/DevDashIcons/diff-modified-16.svg').default.src,
  'diff-removed-16': require('./../../assets/DevDashIcons/diff-removed-16.svg')
    .default.src,
  'diff-renamed-16': require('./../../assets/DevDashIcons/diff-renamed-16.svg')
    .default.src,
  'dot-16': require('./../../assets/DevDashIcons/dot-16.svg').default.src,
  'dot-24': require('./../../assets/DevDashIcons/dot-24.svg').default.src,
  'dot-fill-16': require('./../../assets/DevDashIcons/dot-fill-16.svg').default
    .src,
  'dot-fill-24': require('./../../assets/DevDashIcons/dot-fill-24.svg').default
    .src,
  'download-16': require('./../../assets/DevDashIcons/download-16.svg').default
    .src,
  'download-24': require('./../../assets/DevDashIcons/download-24.svg').default
    .src,
  'duplicate-16': require('./../../assets/DevDashIcons/duplicate-16.svg')
    .default.src,
  'duplicate-24': require('./../../assets/DevDashIcons/duplicate-24.svg')
    .default.src,
  'ellipsis-16': require('./../../assets/DevDashIcons/ellipsis-16.svg').default
    .src,
  'eye-16': require('./../../assets/DevDashIcons/eye-16.svg').default.src,
  'eye-24': require('./../../assets/DevDashIcons/eye-24.svg').default.src,
  'eye-closed-16': require('./../../assets/DevDashIcons/eye-closed-16.svg')
    .default.src,
  'eye-closed-24': require('./../../assets/DevDashIcons/eye-closed-24.svg')
    .default.src,
  'feed-discussion-16':
    require('./../../assets/DevDashIcons/feed-discussion-16.svg').default.src,
  'feed-forked-16': require('./../../assets/DevDashIcons/feed-forked-16.svg')
    .default.src,
  'feed-heart-16': require('./../../assets/DevDashIcons/feed-heart-16.svg')
    .default.src,
  'feed-merged-16': require('./../../assets/DevDashIcons/feed-merged-16.svg')
    .default.src,
  'feed-person-16': require('./../../assets/DevDashIcons/feed-person-16.svg')
    .default.src,
  'feed-repo-16': require('./../../assets/DevDashIcons/feed-repo-16.svg')
    .default.src,
  'feed-rocket-16': require('./../../assets/DevDashIcons/feed-rocket-16.svg')
    .default.src,
  'feed-star-16': require('./../../assets/DevDashIcons/feed-star-16.svg')
    .default.src,
  'feed-tag-16': require('./../../assets/DevDashIcons/feed-tag-16.svg').default
    .src,
  'feed-trophy-16': require('./../../assets/DevDashIcons/feed-trophy-16.svg')
    .default.src,
  'file-16': require('./../../assets/DevDashIcons/file-16.svg').default.src,
  'file-24': require('./../../assets/DevDashIcons/file-24.svg').default.src,
  'file-added-16': require('./../../assets/DevDashIcons/file-added-16.svg')
    .default.src,
  'file-badge-16': require('./../../assets/DevDashIcons/file-badge-16.svg')
    .default.src,
  'file-binary-16': require('./../../assets/DevDashIcons/file-binary-16.svg')
    .default.src,
  'file-binary-24': require('./../../assets/DevDashIcons/file-binary-24.svg')
    .default.src,
  'file-code-16': require('./../../assets/DevDashIcons/file-code-16.svg')
    .default.src,
  'file-code-24': require('./../../assets/DevDashIcons/file-code-24.svg')
    .default.src,
  'file-diff-16': require('./../../assets/DevDashIcons/file-diff-16.svg')
    .default.src,
  'file-diff-24': require('./../../assets/DevDashIcons/file-diff-24.svg')
    .default.src,
  'file-directory-16':
    require('./../../assets/DevDashIcons/file-directory-16.svg').default.src,
  'file-directory-24':
    require('./../../assets/DevDashIcons/file-directory-24.svg').default.src,
  'file-directory-fill-16':
    require('./../../assets/DevDashIcons/file-directory-fill-16.svg').default
      .src,
  'file-directory-fill-24':
    require('./../../assets/DevDashIcons/file-directory-fill-24.svg').default
      .src,
  'file-directory-open-fill-16':
    require('./../../assets/DevDashIcons/file-directory-open-fill-16.svg')
      .default.src,
  'file-media-24': require('./../../assets/DevDashIcons/file-media-24.svg')
    .default.src,
  'file-moved-16': require('./../../assets/DevDashIcons/file-moved-16.svg')
    .default.src,
  'file-removed-16': require('./../../assets/DevDashIcons/file-removed-16.svg')
    .default.src,
  'file-submodule-16':
    require('./../../assets/DevDashIcons/file-submodule-16.svg').default.src,
  'file-submodule-24':
    require('./../../assets/DevDashIcons/file-submodule-24.svg').default.src,
  'file-symlink-file-16':
    require('./../../assets/DevDashIcons/file-symlink-file-16.svg').default.src,
  'file-symlink-file-24':
    require('./../../assets/DevDashIcons/file-symlink-file-24.svg').default.src,
  'file-zip-16': require('./../../assets/DevDashIcons/file-zip-16.svg').default
    .src,
  'file-zip-24': require('./../../assets/DevDashIcons/file-zip-24.svg').default
    .src,
  'filter-16': require('./../../assets/DevDashIcons/filter-16.svg').default.src,
  'filter-24': require('./../../assets/DevDashIcons/filter-24.svg').default.src,
  'flame-16': require('./../../assets/DevDashIcons/flame-16.svg').default.src,
  'flame-24': require('./../../assets/DevDashIcons/flame-24.svg').default.src,
  'fold-16': require('./../../assets/DevDashIcons/fold-16.svg').default.src,
  'fold-24': require('./../../assets/DevDashIcons/fold-24.svg').default.src,
  'fold-down-16': require('./../../assets/DevDashIcons/fold-down-16.svg')
    .default.src,
  'fold-down-24': require('./../../assets/DevDashIcons/fold-down-24.svg')
    .default.src,
  'fold-up-16': require('./../../assets/DevDashIcons/fold-up-16.svg').default
    .src,
  'fold-up-24': require('./../../assets/DevDashIcons/fold-up-24.svg').default
    .src,
  'gear-16': require('./../../assets/DevDashIcons/gear-16.svg').default.src,
  'gear-24': require('./../../assets/DevDashIcons/gear-24.svg').default.src,
  'gift-16': require('./../../assets/DevDashIcons/gift-16.svg').default.src,
  'gift-24': require('./../../assets/DevDashIcons/gift-24.svg').default.src,
  'git-branch-16': require('./../../assets/DevDashIcons/git-branch-16.svg')
    .default.src,
  'git-branch-24': require('./../../assets/DevDashIcons/git-branch-24.svg')
    .default.src,
  'git-commit-16': require('./../../assets/DevDashIcons/git-commit-16.svg')
    .default.src,
  'git-commit-24': require('./../../assets/DevDashIcons/git-commit-24.svg')
    .default.src,
  'git-compare-16': require('./../../assets/DevDashIcons/git-compare-16.svg')
    .default.src,
  'git-compare-24': require('./../../assets/DevDashIcons/git-compare-24.svg')
    .default.src,
  'git-merge-16': require('./../../assets/DevDashIcons/git-merge-16.svg')
    .default.src,
  'git-merge-24': require('./../../assets/DevDashIcons/git-merge-24.svg')
    .default.src,
  'git-merge-queue-16':
    require('./../../assets/DevDashIcons/git-merge-queue-16.svg').default.src,
  'git-pull-request-16':
    require('./../../assets/DevDashIcons/git-pull-request-16.svg').default.src,
  'git-pull-request-24':
    require('./../../assets/DevDashIcons/git-pull-request-24.svg').default.src,
  'git-pull-request-closed-16':
    require('./../../assets/DevDashIcons/git-pull-request-closed-16.svg')
      .default.src,
  'git-pull-request-closed-24':
    require('./../../assets/DevDashIcons/git-pull-request-closed-24.svg')
      .default.src,
  'git-pull-request-draft-16':
    require('./../../assets/DevDashIcons/git-pull-request-draft-16.svg').default
      .src,
  'git-pull-request-draft-24':
    require('./../../assets/DevDashIcons/git-pull-request-draft-24.svg').default
      .src,
  'globe-16': require('./../../assets/DevDashIcons/globe-16.svg').default.src,
  'globe-24': require('./../../assets/DevDashIcons/globe-24.svg').default.src,
  'grabber-16': require('./../../assets/DevDashIcons/grabber-16.svg').default
    .src,
  'grabber-24': require('./../../assets/DevDashIcons/grabber-24.svg').default
    .src,
  'graph-16': require('./../../assets/DevDashIcons/graph-16.svg').default.src,
  'graph-24': require('./../../assets/DevDashIcons/graph-24.svg').default.src,
  'hash-16': require('./../../assets/DevDashIcons/hash-16.svg').default.src,
  'hash-24': require('./../../assets/DevDashIcons/hash-24.svg').default.src,
  'heading-16': require('./../../assets/DevDashIcons/heading-16.svg').default
    .src,
  'heading-24': require('./../../assets/DevDashIcons/heading-24.svg').default
    .src,
  'heart-16': require('./../../assets/DevDashIcons/heart-16.svg').default.src,
  'heart-24': require('./../../assets/DevDashIcons/heart-24.svg').default.src,
  'heart-fill-16': require('./../../assets/DevDashIcons/heart-fill-16.svg')
    .default.src,
  'heart-fill-24': require('./../../assets/DevDashIcons/heart-fill-24.svg')
    .default.src,
  'history-16': require('./../../assets/DevDashIcons/history-16.svg').default
    .src,
  'history-24': require('./../../assets/DevDashIcons/history-24.svg').default
    .src,
  'home-16': require('./../../assets/DevDashIcons/home-16.svg').default.src,
  'home-24': require('./../../assets/DevDashIcons/home-24.svg').default.src,
  'home-fill-24': require('./../../assets/DevDashIcons/home-fill-24.svg')
    .default.src,
  'horizontal-rule-16':
    require('./../../assets/DevDashIcons/horizontal-rule-16.svg').default.src,
  'horizontal-rule-24':
    require('./../../assets/DevDashIcons/horizontal-rule-24.svg').default.src,
  'hourglass-16': require('./../../assets/DevDashIcons/hourglass-16.svg')
    .default.src,
  'hourglass-24': require('./../../assets/DevDashIcons/hourglass-24.svg')
    .default.src,
  'hubot-16': require('./../../assets/DevDashIcons/hubot-16.svg').default.src,
  'hubot-24': require('./../../assets/DevDashIcons/hubot-24.svg').default.src,
  'id-badge-16': require('./../../assets/DevDashIcons/id-badge-16.svg').default
    .src,
  'image-16': require('./../../assets/DevDashIcons/image-16.svg').default.src,
  'image-24': require('./../../assets/DevDashIcons/image-24.svg').default.src,
  'inbox-16': require('./../../assets/DevDashIcons/inbox-16.svg').default.src,
  'inbox-24': require('./../../assets/DevDashIcons/inbox-24.svg').default.src,
  'infinity-16': require('./../../assets/DevDashIcons/infinity-16.svg').default
    .src,
  'infinity-24': require('./../../assets/DevDashIcons/infinity-24.svg').default
    .src,
  'info-16': require('./../../assets/DevDashIcons/info-16.svg').default.src,
  'info-24': require('./../../assets/DevDashIcons/info-24.svg').default.src,
  'issue-closed-16': require('./../../assets/DevDashIcons/issue-closed-16.svg')
    .default.src,
  'issue-closed-24': require('./../../assets/DevDashIcons/issue-closed-24.svg')
    .default.src,
  'issue-draft-16': require('./../../assets/DevDashIcons/issue-draft-16.svg')
    .default.src,
  'issue-draft-24': require('./../../assets/DevDashIcons/issue-draft-24.svg')
    .default.src,
  'issue-opened-16': require('./../../assets/DevDashIcons/issue-opened-16.svg')
    .default.src,
  'issue-opened-24': require('./../../assets/DevDashIcons/issue-opened-24.svg')
    .default.src,
  'issue-reopened-16':
    require('./../../assets/DevDashIcons/issue-reopened-16.svg').default.src,
  'issue-reopened-24':
    require('./../../assets/DevDashIcons/issue-reopened-24.svg').default.src,
  'italic-16': require('./../../assets/DevDashIcons/italic-16.svg').default.src,
  'italic-24': require('./../../assets/DevDashIcons/italic-24.svg').default.src,
  'iterations-16': require('./../../assets/DevDashIcons/iterations-16.svg')
    .default.src,
  'iterations-24': require('./../../assets/DevDashIcons/iterations-24.svg')
    .default.src,
  'kebab-horizontal-16':
    require('./../../assets/DevDashIcons/kebab-horizontal-16.svg').default.src,
  'kebab-horizontal-24':
    require('./../../assets/DevDashIcons/kebab-horizontal-24.svg').default.src,
  'key-16': require('./../../assets/DevDashIcons/key-16.svg').default.src,
  'key-24': require('./../../assets/DevDashIcons/key-24.svg').default.src,
  'key-asterisk-16': require('./../../assets/DevDashIcons/key-asterisk-16.svg')
    .default.src,
  'law-16': require('./../../assets/DevDashIcons/law-16.svg').default.src,
  'law-24': require('./../../assets/DevDashIcons/law-24.svg').default.src,
  'light-bulb-16': require('./../../assets/DevDashIcons/light-bulb-16.svg')
    .default.src,
  'light-bulb-24': require('./../../assets/DevDashIcons/light-bulb-24.svg')
    .default.src,
  'link-16': require('./../../assets/DevDashIcons/link-16.svg').default.src,
  'link-24': require('./../../assets/DevDashIcons/link-24.svg').default.src,
  'link-external-16':
    require('./../../assets/DevDashIcons/link-external-16.svg').default.src,
  'link-external-24':
    require('./../../assets/DevDashIcons/link-external-24.svg').default.src,
  'list-ordered-16': require('./../../assets/DevDashIcons/list-ordered-16.svg')
    .default.src,
  'list-ordered-24': require('./../../assets/DevDashIcons/list-ordered-24.svg')
    .default.src,
  'list-unordered-16':
    require('./../../assets/DevDashIcons/list-unordered-16.svg').default.src,
  'list-unordered-24':
    require('./../../assets/DevDashIcons/list-unordered-24.svg').default.src,
  'location-16': require('./../../assets/DevDashIcons/location-16.svg').default
    .src,
  'location-24': require('./../../assets/DevDashIcons/location-24.svg').default
    .src,
  'lock-16': require('./../../assets/DevDashIcons/lock-16.svg').default.src,
  'lock-24': require('./../../assets/DevDashIcons/lock-24.svg').default.src,
  'log-16': require('./../../assets/DevDashIcons/log-16.svg').default.src,
  'logo-gist-16': require('./../../assets/DevDashIcons/logo-gist-16.svg')
    .default.src,
  'logo-github-16': require('./../../assets/DevDashIcons/logo-github-16.svg')
    .default.src,
  'mail-16': require('./../../assets/DevDashIcons/mail-16.svg').default.src,
  'mail-24': require('./../../assets/DevDashIcons/mail-24.svg').default.src,
  'mark-github-16': require('./../../assets/DevDashIcons/mark-github-16.svg')
    .default.src,
  'markdown-16': require('./../../assets/DevDashIcons/markdown-16.svg').default
    .src,
  'megaphone-16': require('./../../assets/DevDashIcons/megaphone-16.svg')
    .default.src,
  'megaphone-24': require('./../../assets/DevDashIcons/megaphone-24.svg')
    .default.src,
  'mention-16': require('./../../assets/DevDashIcons/mention-16.svg').default
    .src,
  'mention-24': require('./../../assets/DevDashIcons/mention-24.svg').default
    .src,
  'meter-16': require('./../../assets/DevDashIcons/meter-16.svg').default.src,
  'milestone-16': require('./../../assets/DevDashIcons/milestone-16.svg')
    .default.src,
  'milestone-24': require('./../../assets/DevDashIcons/milestone-24.svg')
    .default.src,
  'mirror-16': require('./../../assets/DevDashIcons/mirror-16.svg').default.src,
  'mirror-24': require('./../../assets/DevDashIcons/mirror-24.svg').default.src,
  'moon-16': require('./../../assets/DevDashIcons/moon-16.svg').default.src,
  'moon-24': require('./../../assets/DevDashIcons/moon-24.svg').default.src,
  'mortar-board-16': require('./../../assets/DevDashIcons/mortar-board-16.svg')
    .default.src,
  'mortar-board-24': require('./../../assets/DevDashIcons/mortar-board-24.svg')
    .default.src,
  'multi-select-16': require('./../../assets/DevDashIcons/multi-select-16.svg')
    .default.src,
  'multi-select-24': require('./../../assets/DevDashIcons/multi-select-24.svg')
    .default.src,
  'mute-16': require('./../../assets/DevDashIcons/mute-16.svg').default.src,
  'mute-24': require('./../../assets/DevDashIcons/mute-24.svg').default.src,
  'no-entry-16': require('./../../assets/DevDashIcons/no-entry-16.svg').default
    .src,
  'no-entry-24': require('./../../assets/DevDashIcons/no-entry-24.svg').default
    .src,
  'no-entry-fill-12':
    require('./../../assets/DevDashIcons/no-entry-fill-12.svg').default.src,
  'north-star-16': require('./../../assets/DevDashIcons/north-star-16.svg')
    .default.src,
  'north-star-24': require('./../../assets/DevDashIcons/north-star-24.svg')
    .default.src,
  'note-16': require('./../../assets/DevDashIcons/note-16.svg').default.src,
  'note-24': require('./../../assets/DevDashIcons/note-24.svg').default.src,
  'number-16': require('./../../assets/DevDashIcons/number-16.svg').default.src,
  'number-24': require('./../../assets/DevDashIcons/number-24.svg').default.src,
  'organization-16': require('./../../assets/DevDashIcons/organization-16.svg')
    .default.src,
  'organization-24': require('./../../assets/DevDashIcons/organization-24.svg')
    .default.src,
  'package-16': require('./../../assets/DevDashIcons/package-16.svg').default
    .src,
  'package-24': require('./../../assets/DevDashIcons/package-24.svg').default
    .src,
  'package-dependencies-16':
    require('./../../assets/DevDashIcons/package-dependencies-16.svg').default
      .src,
  'package-dependencies-24':
    require('./../../assets/DevDashIcons/package-dependencies-24.svg').default
      .src,
  'package-dependents-16':
    require('./../../assets/DevDashIcons/package-dependents-16.svg').default
      .src,
  'package-dependents-24':
    require('./../../assets/DevDashIcons/package-dependents-24.svg').default
      .src,
  'paintbrush-16': require('./../../assets/DevDashIcons/paintbrush-16.svg')
    .default.src,
  'paper-airplane-16':
    require('./../../assets/DevDashIcons/paper-airplane-16.svg').default.src,
  'paper-airplane-24':
    require('./../../assets/DevDashIcons/paper-airplane-24.svg').default.src,
  'paperclip-16': require('./../../assets/DevDashIcons/paperclip-16.svg')
    .default.src,
  'paperclip-24': require('./../../assets/DevDashIcons/paperclip-24.svg')
    .default.src,
  'paste-16': require('./../../assets/DevDashIcons/paste-16.svg').default.src,
  'paste-24': require('./../../assets/DevDashIcons/paste-24.svg').default.src,
  'pencil-16': require('./../../assets/DevDashIcons/pencil-16.svg').default.src,
  'pencil-24': require('./../../assets/DevDashIcons/pencil-24.svg').default.src,
  'people-16': require('./../../assets/DevDashIcons/people-16.svg').default.src,
  'people-24': require('./../../assets/DevDashIcons/people-24.svg').default.src,
  'person-16': require('./../../assets/DevDashIcons/person-16.svg').default.src,
  'person-24': require('./../../assets/DevDashIcons/person-24.svg').default.src,
  'person-add-16': require('./../../assets/DevDashIcons/person-add-16.svg')
    .default.src,
  'person-add-24': require('./../../assets/DevDashIcons/person-add-24.svg')
    .default.src,
  'person-fill-16': require('./../../assets/DevDashIcons/person-fill-16.svg')
    .default.src,
  'person-fill-24': require('./../../assets/DevDashIcons/person-fill-24.svg')
    .default.src,
  'pin-16': require('./../../assets/DevDashIcons/pin-16.svg').default.src,
  'pin-24': require('./../../assets/DevDashIcons/pin-24.svg').default.src,
  'play-16': require('./../../assets/DevDashIcons/play-16.svg').default.src,
  'play-24': require('./../../assets/DevDashIcons/play-24.svg').default.src,
  'plug-16': require('./../../assets/DevDashIcons/plug-16.svg').default.src,
  'plug-24': require('./../../assets/DevDashIcons/plug-24.svg').default.src,
  'plus-16': require('./../../assets/DevDashIcons/plus-16.svg').default.src,
  'plus-24': require('./../../assets/DevDashIcons/plus-24.svg').default.src,
  'plus-circle-16': require('./../../assets/DevDashIcons/plus-circle-16.svg')
    .default.src,
  'plus-circle-24': require('./../../assets/DevDashIcons/plus-circle-24.svg')
    .default.src,
  'project-16': require('./../../assets/DevDashIcons/project-16.svg').default
    .src,
  'project-24': require('./../../assets/DevDashIcons/project-24.svg').default
    .src,
  'pulse-16': require('./../../assets/DevDashIcons/pulse-16.svg').default.src,
  'pulse-24': require('./../../assets/DevDashIcons/pulse-24.svg').default.src,
  'question-16': require('./../../assets/DevDashIcons/question-16.svg').default
    .src,
  'question-24': require('./../../assets/DevDashIcons/question-24.svg').default
    .src,
  'quote-16': require('./../../assets/DevDashIcons/quote-16.svg').default.src,
  'quote-24': require('./../../assets/DevDashIcons/quote-24.svg').default.src,
  'reply-16': require('./../../assets/DevDashIcons/reply-16.svg').default.src,
  'reply-24': require('./../../assets/DevDashIcons/reply-24.svg').default.src,
  'repo-16': require('./../../assets/DevDashIcons/repo-16.svg').default.src,
  'repo-24': require('./../../assets/DevDashIcons/repo-24.svg').default.src,
  'repo-clone-16': require('./../../assets/DevDashIcons/repo-clone-16.svg')
    .default.src,
  'repo-deleted-16': require('./../../assets/DevDashIcons/repo-deleted-16.svg')
    .default.src,
  'repo-forked-16': require('./../../assets/DevDashIcons/repo-forked-16.svg')
    .default.src,
  'repo-forked-24': require('./../../assets/DevDashIcons/repo-forked-24.svg')
    .default.src,
  'repo-locked-16': require('./../../assets/DevDashIcons/repo-locked-16.svg')
    .default.src,
  'repo-locked-24': require('./../../assets/DevDashIcons/repo-locked-24.svg')
    .default.src,
  'repo-pull-16': require('./../../assets/DevDashIcons/repo-pull-16.svg')
    .default.src,
  'repo-push-16': require('./../../assets/DevDashIcons/repo-push-16.svg')
    .default.src,
  'repo-push-24': require('./../../assets/DevDashIcons/repo-push-24.svg')
    .default.src,
  'repo-template-16':
    require('./../../assets/DevDashIcons/repo-template-16.svg').default.src,
  'repo-template-24':
    require('./../../assets/DevDashIcons/repo-template-24.svg').default.src,
  'report-16': require('./../../assets/DevDashIcons/report-16.svg').default.src,
  'report-24': require('./../../assets/DevDashIcons/report-24.svg').default.src,
  'rocket-16': require('./../../assets/DevDashIcons/rocket-16.svg').default.src,
  'rocket-24': require('./../../assets/DevDashIcons/rocket-24.svg').default.src,
  'rows-16': require('./../../assets/DevDashIcons/rows-16.svg').default.src,
  'rows-24': require('./../../assets/DevDashIcons/rows-24.svg').default.src,
  'rss-16': require('./../../assets/DevDashIcons/rss-16.svg').default.src,
  'rss-24': require('./../../assets/DevDashIcons/rss-24.svg').default.src,
  'ruby-16': require('./../../assets/DevDashIcons/ruby-16.svg').default.src,
  'ruby-24': require('./../../assets/DevDashIcons/ruby-24.svg').default.src,
  'screen-full-16': require('./../../assets/DevDashIcons/screen-full-16.svg')
    .default.src,
  'screen-full-24': require('./../../assets/DevDashIcons/screen-full-24.svg')
    .default.src,
  'screen-normal-16':
    require('./../../assets/DevDashIcons/screen-normal-16.svg').default.src,
  'screen-normal-24':
    require('./../../assets/DevDashIcons/screen-normal-24.svg').default.src,
  'search-16': require('./../../assets/DevDashIcons/search-16.svg').default.src,
  'search-24': require('./../../assets/DevDashIcons/search-24.svg').default.src,
  'server-16': require('./../../assets/DevDashIcons/server-16.svg').default.src,
  'server-24': require('./../../assets/DevDashIcons/server-24.svg').default.src,
  'share-16': require('./../../assets/DevDashIcons/share-16.svg').default.src,
  'share-24': require('./../../assets/DevDashIcons/share-24.svg').default.src,
  'share-android-16':
    require('./../../assets/DevDashIcons/share-android-16.svg').default.src,
  'share-android-24':
    require('./../../assets/DevDashIcons/share-android-24.svg').default.src,
  'shield-16': require('./../../assets/DevDashIcons/shield-16.svg').default.src,
  'shield-24': require('./../../assets/DevDashIcons/shield-24.svg').default.src,
  'shield-check-16': require('./../../assets/DevDashIcons/shield-check-16.svg')
    .default.src,
  'shield-check-24': require('./../../assets/DevDashIcons/shield-check-24.svg')
    .default.src,
  'shield-lock-16': require('./../../assets/DevDashIcons/shield-lock-16.svg')
    .default.src,
  'shield-lock-24': require('./../../assets/DevDashIcons/shield-lock-24.svg')
    .default.src,
  'shield-slash-16': require('./../../assets/DevDashIcons/shield-slash-16.svg')
    .default.src,
  'shield-x-16': require('./../../assets/DevDashIcons/shield-x-16.svg').default
    .src,
  'shield-x-24': require('./../../assets/DevDashIcons/shield-x-24.svg').default
    .src,
  'sidebar-collapse-16':
    require('./../../assets/DevDashIcons/sidebar-collapse-16.svg').default.src,
  'sidebar-collapse-24':
    require('./../../assets/DevDashIcons/sidebar-collapse-24.svg').default.src,
  'sidebar-expand-16':
    require('./../../assets/DevDashIcons/sidebar-expand-16.svg').default.src,
  'sidebar-expand-24':
    require('./../../assets/DevDashIcons/sidebar-expand-24.svg').default.src,
  'sign-in-16': require('./../../assets/DevDashIcons/sign-in-16.svg').default
    .src,
  'sign-in-24': require('./../../assets/DevDashIcons/sign-in-24.svg').default
    .src,
  'sign-out-16': require('./../../assets/DevDashIcons/sign-out-16.svg').default
    .src,
  'sign-out-24': require('./../../assets/DevDashIcons/sign-out-24.svg').default
    .src,
  'single-select-16':
    require('./../../assets/DevDashIcons/single-select-16.svg').default.src,
  'single-select-24':
    require('./../../assets/DevDashIcons/single-select-24.svg').default.src,
  'skip-16': require('./../../assets/DevDashIcons/skip-16.svg').default.src,
  'skip-24': require('./../../assets/DevDashIcons/skip-24.svg').default.src,
  'sliders-16': require('./../../assets/DevDashIcons/sliders-16.svg').default
    .src,
  'smiley-16': require('./../../assets/DevDashIcons/smiley-16.svg').default.src,
  'smiley-24': require('./../../assets/DevDashIcons/smiley-24.svg').default.src,
  'sort-asc-16': require('./../../assets/DevDashIcons/sort-asc-16.svg').default
    .src,
  'sort-asc-24': require('./../../assets/DevDashIcons/sort-asc-24.svg').default
    .src,
  'sort-desc-16': require('./../../assets/DevDashIcons/sort-desc-16.svg')
    .default.src,
  'sort-desc-24': require('./../../assets/DevDashIcons/sort-desc-24.svg')
    .default.src,
  'square-16': require('./../../assets/DevDashIcons/square-16.svg').default.src,
  'square-24': require('./../../assets/DevDashIcons/square-24.svg').default.src,
  'square-fill-16': require('./../../assets/DevDashIcons/square-fill-16.svg')
    .default.src,
  'square-fill-24': require('./../../assets/DevDashIcons/square-fill-24.svg')
    .default.src,
  'squirrel-16': require('./../../assets/DevDashIcons/squirrel-16.svg').default
    .src,
  'squirrel-24': require('./../../assets/DevDashIcons/squirrel-24.svg').default
    .src,
  'stack-16': require('./../../assets/DevDashIcons/stack-16.svg').default.src,
  'stack-24': require('./../../assets/DevDashIcons/stack-24.svg').default.src,
  'star-16': require('./../../assets/DevDashIcons/star-16.svg').default.src,
  'star-24': require('./../../assets/DevDashIcons/star-24.svg').default.src,
  'star-fill-16': require('./../../assets/DevDashIcons/star-fill-16.svg')
    .default.src,
  'star-fill-24': require('./../../assets/DevDashIcons/star-fill-24.svg')
    .default.src,
  'stop-16': require('./../../assets/DevDashIcons/stop-16.svg').default.src,
  'stop-24': require('./../../assets/DevDashIcons/stop-24.svg').default.src,
  'stopwatch-16': require('./../../assets/DevDashIcons/stopwatch-16.svg')
    .default.src,
  'stopwatch-24': require('./../../assets/DevDashIcons/stopwatch-24.svg')
    .default.src,
  'strikethrough-16':
    require('./../../assets/DevDashIcons/strikethrough-16.svg').default.src,
  'strikethrough-24':
    require('./../../assets/DevDashIcons/strikethrough-24.svg').default.src,
  'sun-16': require('./../../assets/DevDashIcons/sun-16.svg').default.src,
  'sun-24': require('./../../assets/DevDashIcons/sun-24.svg').default.src,
  'sync-16': require('./../../assets/DevDashIcons/sync-16.svg').default.src,
  'sync-24': require('./../../assets/DevDashIcons/sync-24.svg').default.src,
  'tab-24': require('./../../assets/DevDashIcons/tab-24.svg').default.src,
  'tab-external-16': require('./../../assets/DevDashIcons/tab-external-16.svg')
    .default.src,
  'table-16': require('./../../assets/DevDashIcons/table-16.svg').default.src,
  'table-24': require('./../../assets/DevDashIcons/table-24.svg').default.src,
  'tag-16': require('./../../assets/DevDashIcons/tag-16.svg').default.src,
  'tag-24': require('./../../assets/DevDashIcons/tag-24.svg').default.src,
  'tasklist-16': require('./../../assets/DevDashIcons/tasklist-16.svg').default
    .src,
  'tasklist-24': require('./../../assets/DevDashIcons/tasklist-24.svg').default
    .src,
  'telescope-16': require('./../../assets/DevDashIcons/telescope-16.svg')
    .default.src,
  'telescope-24': require('./../../assets/DevDashIcons/telescope-24.svg')
    .default.src,
  'telescope-fill-16':
    require('./../../assets/DevDashIcons/telescope-fill-16.svg').default.src,
  'telescope-fill-24':
    require('./../../assets/DevDashIcons/telescope-fill-24.svg').default.src,
  'terminal-16': require('./../../assets/DevDashIcons/terminal-16.svg').default
    .src,
  'terminal-24': require('./../../assets/DevDashIcons/terminal-24.svg').default
    .src,
  'three-bars-16': require('./../../assets/DevDashIcons/three-bars-16.svg')
    .default.src,
  'thumbsdown-16': require('./../../assets/DevDashIcons/thumbsdown-16.svg')
    .default.src,
  'thumbsdown-24': require('./../../assets/DevDashIcons/thumbsdown-24.svg')
    .default.src,
  'thumbsup-16': require('./../../assets/DevDashIcons/thumbsup-16.svg').default
    .src,
  'thumbsup-24': require('./../../assets/DevDashIcons/thumbsup-24.svg').default
    .src,
  'tools-16': require('./../../assets/DevDashIcons/tools-16.svg').default.src,
  'tools-24': require('./../../assets/DevDashIcons/tools-24.svg').default.src,
  'trash-16': require('./../../assets/DevDashIcons/trash-16.svg').default.src,
  'trash-24': require('./../../assets/DevDashIcons/trash-24.svg').default.src,
  'triangle-down-16':
    require('./../../assets/DevDashIcons/triangle-down-16.svg').default.src,
  'triangle-down-24':
    require('./../../assets/DevDashIcons/triangle-down-24.svg').default.src,
  'triangle-left-16':
    require('./../../assets/DevDashIcons/triangle-left-16.svg').default.src,
  'triangle-left-24':
    require('./../../assets/DevDashIcons/triangle-left-24.svg').default.src,
  'triangle-right-16':
    require('./../../assets/DevDashIcons/triangle-right-16.svg').default.src,
  'triangle-right-24':
    require('./../../assets/DevDashIcons/triangle-right-24.svg').default.src,
  'triangle-up-16': require('./../../assets/DevDashIcons/triangle-up-16.svg')
    .default.src,
  'triangle-up-24': require('./../../assets/DevDashIcons/triangle-up-24.svg')
    .default.src,
  'trophy-16': require('./../../assets/DevDashIcons/trophy-16.svg').default.src,
  'trophy-24': require('./../../assets/DevDashIcons/trophy-24.svg').default.src,
  'typography-16': require('./../../assets/DevDashIcons/typography-16.svg')
    .default.src,
  'typography-24': require('./../../assets/DevDashIcons/typography-24.svg')
    .default.src,
  'unfold-16': require('./../../assets/DevDashIcons/unfold-16.svg').default.src,
  'unfold-24': require('./../../assets/DevDashIcons/unfold-24.svg').default.src,
  'unlock-16': require('./../../assets/DevDashIcons/unlock-16.svg').default.src,
  'unlock-24': require('./../../assets/DevDashIcons/unlock-24.svg').default.src,
  'unmute-16': require('./../../assets/DevDashIcons/unmute-16.svg').default.src,
  'unmute-24': require('./../../assets/DevDashIcons/unmute-24.svg').default.src,
  'unverified-16': require('./../../assets/DevDashIcons/unverified-16.svg')
    .default.src,
  'unverified-24': require('./../../assets/DevDashIcons/unverified-24.svg')
    .default.src,
  'upload-16': require('./../../assets/DevDashIcons/upload-16.svg').default.src,
  'upload-24': require('./../../assets/DevDashIcons/upload-24.svg').default.src,
  'verified-16': require('./../../assets/DevDashIcons/verified-16.svg').default
    .src,
  'verified-24': require('./../../assets/DevDashIcons/verified-24.svg').default
    .src,
  'versions-16': require('./../../assets/DevDashIcons/versions-16.svg').default
    .src,
  'versions-24': require('./../../assets/DevDashIcons/versions-24.svg').default
    .src,
  'video-16': require('./../../assets/DevDashIcons/video-16.svg').default.src,
  'video-24': require('./../../assets/DevDashIcons/video-24.svg').default.src,
  'webhook-16': require('./../../assets/DevDashIcons/webhook-16.svg').default
    .src,
  'workflow-16': require('./../../assets/DevDashIcons/workflow-16.svg').default
    .src,
  'workflow-24': require('./../../assets/DevDashIcons/workflow-24.svg').default
    .src,
  'x-16': require('./../../assets/DevDashIcons/x-16.svg').default.src,
  'x-24': require('./../../assets/DevDashIcons/x-24.svg').default.src,
  'x-circle-16': require('./../../assets/DevDashIcons/x-circle-16.svg').default
    .src,
  'x-circle-24': require('./../../assets/DevDashIcons/x-circle-24.svg').default
    .src,
  'x-circle-fill-12':
    require('./../../assets/DevDashIcons/x-circle-fill-12.svg').default.src,
  'x-circle-fill-16':
    require('./../../assets/DevDashIcons/x-circle-fill-16.svg').default.src,
  'x-circle-fill-24':
    require('./../../assets/DevDashIcons/x-circle-fill-24.svg').default.src,
  'zap-16': require('./../../assets/DevDashIcons/zap-16.svg').default.src,
  'zap-24': require('./../../assets/DevDashIcons/zap-24.svg').default.src,
  devdash: require('./../../assets/DevDashIcons/devdash.svg').default.src,
  'devdash-green': require('./../../assets/DevDashIcons/devdash-green.svg')
    .default.src
};

export type DevDashIcon = keyof typeof DevDashIconInternal;

export default function Icon(props: {
  name: keyof typeof DevDashIconInternal;
  style?: CSSProperties;
  className?: string;
  color?: COLOR;
  useDefaultColor?: boolean;
}) {
  return (
    <div
      style={{
        ...props.style,
        ...(props.useDefaultColor
          ? {
              backgroundImage: `url(${DevDashIconInternal[props.name]})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          : {
              maskImage: `url(${DevDashIconInternal[props.name]})`,
              WebkitMaskImage: `url(${DevDashIconInternal[props.name]})`,
              backgroundColor: props.color,
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover',
              WebkitMaskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'cover'
            })
      }}
      className={props.className}
    />
  );
}
