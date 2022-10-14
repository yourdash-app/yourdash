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
    require('./../../assets/DashIcons/accessibility-16.svg').default.src,
  'accessibility-inset-16':
    require('./../../assets/DashIcons/accessibility-inset-16.svg').default
      .src,
  'alert-16': require('./../../assets/DashIcons/alert-16.svg').default.src,
  'alert-24': require('./../../assets/DashIcons/alert-24.svg').default.src,
  'alert-fill-12': require('./../../assets/DashIcons/alert-fill-12.svg')
    .default.src,
  'apps-16': require('./../../assets/DashIcons/apps-16.svg').default.src,
  'archive-16': require('./../../assets/DashIcons/archive-16.svg').default
    .src,
  'archive-24': require('./../../assets/DashIcons/archive-24.svg').default
    .src,
  'arrow-both-16': require('./../../assets/DashIcons/arrow-both-16.svg')
    .default.src,
  'arrow-both-24': require('./../../assets/DashIcons/arrow-both-24.svg')
    .default.src,
  'arrow-down-16': require('./../../assets/DashIcons/arrow-down-16.svg')
    .default.src,
  'arrow-down-24': require('./../../assets/DashIcons/arrow-down-24.svg')
    .default.src,
  'arrow-down-left-24':
    require('./../../assets/DashIcons/arrow-down-left-24.svg').default.src,
  'arrow-down-right-24':
    require('./../../assets/DashIcons/arrow-down-right-24.svg').default.src,
  'arrow-left-16': require('./../../assets/DashIcons/arrow-left-16.svg')
    .default.src,
  'arrow-left-24': require('./../../assets/DashIcons/arrow-left-24.svg')
    .default.src,
  'arrow-right-16': require('./../../assets/DashIcons/arrow-right-16.svg')
    .default.src,
  'arrow-right-24': require('./../../assets/DashIcons/arrow-right-24.svg')
    .default.src,
  'arrow-switch-16': require('./../../assets/DashIcons/arrow-switch-16.svg')
    .default.src,
  'arrow-switch-24': require('./../../assets/DashIcons/arrow-switch-24.svg')
    .default.src,
  'arrow-up-16': require('./../../assets/DashIcons/arrow-up-16.svg').default
    .src,
  'arrow-up-24': require('./../../assets/DashIcons/arrow-up-24.svg').default
    .src,
  'arrow-up-left-24':
    require('./../../assets/DashIcons/arrow-up-left-24.svg').default.src,
  'arrow-up-right-24':
    require('./../../assets/DashIcons/arrow-up-right-24.svg').default.src,
  'beaker-16': require('./../../assets/DashIcons/beaker-16.svg').default.src,
  'beaker-24': require('./../../assets/DashIcons/beaker-24.svg').default.src,
  'bell-16': require('./../../assets/DashIcons/bell-16.svg').default.src,
  'bell-24': require('./../../assets/DashIcons/bell-24.svg').default.src,
  'bell-fill-16': require('./../../assets/DashIcons/bell-fill-16.svg')
    .default.src,
  'bell-fill-24': require('./../../assets/DashIcons/bell-fill-24.svg')
    .default.src,
  'bell-slash-16': require('./../../assets/DashIcons/bell-slash-16.svg')
    .default.src,
  'bell-slash-24': require('./../../assets/DashIcons/bell-slash-24.svg')
    .default.src,
  'blocked-16': require('./../../assets/DashIcons/blocked-16.svg').default
    .src,
  'blocked-24': require('./../../assets/DashIcons/blocked-24.svg').default
    .src,
  'bold-16': require('./../../assets/DashIcons/bold-16.svg').default.src,
  'bold-24': require('./../../assets/DashIcons/bold-24.svg').default.src,
  'book-16': require('./../../assets/DashIcons/book-16.svg').default.src,
  'book-24': require('./../../assets/DashIcons/book-24.svg').default.src,
  'bookmark-16': require('./../../assets/DashIcons/bookmark-16.svg').default
    .src,
  'bookmark-24': require('./../../assets/DashIcons/bookmark-24.svg').default
    .src,
  'bookmark-fill-24':
    require('./../../assets/DashIcons/bookmark-fill-24.svg').default.src,
  'bookmark-slash-16':
    require('./../../assets/DashIcons/bookmark-slash-16.svg').default.src,
  'bookmark-slash-24':
    require('./../../assets/DashIcons/bookmark-slash-24.svg').default.src,
  'bookmark-slash-fill-24':
    require('./../../assets/DashIcons/bookmark-slash-fill-24.svg').default
      .src,
  'briefcase-16': require('./../../assets/DashIcons/briefcase-16.svg')
    .default.src,
  'briefcase-24': require('./../../assets/DashIcons/briefcase-24.svg')
    .default.src,
  'broadcast-16': require('./../../assets/DashIcons/broadcast-16.svg')
    .default.src,
  'broadcast-24': require('./../../assets/DashIcons/broadcast-24.svg')
    .default.src,
  'browser-16': require('./../../assets/DashIcons/browser-16.svg').default
    .src,
  'browser-24': require('./../../assets/DashIcons/browser-24.svg').default
    .src,
  'bug-16': require('./../../assets/DashIcons/bug-16.svg').default.src,
  'bug-24': require('./../../assets/DashIcons/bug-24.svg').default.src,
  'cache-16': require('./../../assets/DashIcons/cache-16.svg').default.src,
  'calendar-16': require('./../../assets/DashIcons/calendar-16.svg').default
    .src,
  'calendar-24': require('./../../assets/DashIcons/calendar-24.svg').default
    .src,
  'check-16': require('./../../assets/DashIcons/check-16.svg').default.src,
  'check-24': require('./../../assets/DashIcons/check-24.svg').default.src,
  'check-circle-16': require('./../../assets/DashIcons/check-circle-16.svg')
    .default.src,
  'check-circle-24': require('./../../assets/DashIcons/check-circle-24.svg')
    .default.src,
  'check-circle-fill-12':
    require('./../../assets/DashIcons/check-circle-fill-12.svg').default.src,
  'check-circle-fill-16':
    require('./../../assets/DashIcons/check-circle-fill-16.svg').default.src,
  'check-circle-fill-24':
    require('./../../assets/DashIcons/check-circle-fill-24.svg').default.src,
  'checkbox-16': require('./../../assets/DashIcons/checkbox-16.svg').default
    .src,
  'checkbox-24': require('./../../assets/DashIcons/checkbox-24.svg').default
    .src,
  'checklist-16': require('./../../assets/DashIcons/checklist-16.svg')
    .default.src,
  'checklist-24': require('./../../assets/DashIcons/checklist-24.svg')
    .default.src,
  'chevron-down-16': require('./../../assets/DashIcons/chevron-down-16.svg')
    .default.src,
  'chevron-down-24': require('./../../assets/DashIcons/chevron-down-24.svg')
    .default.src,
  'chevron-left-16': require('./../../assets/DashIcons/chevron-left-16.svg')
    .default.src,
  'chevron-left-24': require('./../../assets/DashIcons/chevron-left-24.svg')
    .default.src,
  'chevron-right-16':
    require('./../../assets/DashIcons/chevron-right-16.svg').default.src,
  'chevron-right-24':
    require('./../../assets/DashIcons/chevron-right-24.svg').default.src,
  'chevron-up-16': require('./../../assets/DashIcons/chevron-up-16.svg')
    .default.src,
  'chevron-up-24': require('./../../assets/DashIcons/chevron-up-24.svg')
    .default.src,
  'circle-16': require('./../../assets/DashIcons/circle-16.svg').default.src,
  'circle-24': require('./../../assets/DashIcons/circle-24.svg').default.src,
  'circle-slash-16': require('./../../assets/DashIcons/circle-slash-16.svg')
    .default.src,
  'circle-slash-24': require('./../../assets/DashIcons/circle-slash-24.svg')
    .default.src,
  'clock-16': require('./../../assets/DashIcons/clock-16.svg').default.src,
  'clock-24': require('./../../assets/DashIcons/clock-24.svg').default.src,
  'cloud-16': require('./../../assets/DashIcons/cloud-16.svg').default.src,
  'cloud-24': require('./../../assets/DashIcons/cloud-24.svg').default.src,
  'cloud-offline-16':
    require('./../../assets/DashIcons/cloud-offline-16.svg').default.src,
  'cloud-offline-24':
    require('./../../assets/DashIcons/cloud-offline-24.svg').default.src,
  'code-16': require('./../../assets/DashIcons/code-16.svg').default.src,
  'code-24': require('./../../assets/DashIcons/code-24.svg').default.src,
  'code-of-conduct-16':
    require('./../../assets/DashIcons/code-of-conduct-16.svg').default.src,
  'code-of-conduct-24':
    require('./../../assets/DashIcons/code-of-conduct-24.svg').default.src,
  'code-review-16': require('./../../assets/DashIcons/code-review-16.svg')
    .default.src,
  'code-review-24': require('./../../assets/DashIcons/code-review-24.svg')
    .default.src,
  'code-square-16': require('./../../assets/DashIcons/code-square-16.svg')
    .default.src,
  'code-square-24': require('./../../assets/DashIcons/code-square-24.svg')
    .default.src,
  'codescan-16': require('./../../assets/DashIcons/codescan-16.svg').default
    .src,
  'codescan-24': require('./../../assets/DashIcons/codescan-24.svg').default
    .src,
  'codescan-checkmark-16':
    require('./../../assets/DashIcons/codescan-checkmark-16.svg').default
      .src,
  'codescan-checkmark-24':
    require('./../../assets/DashIcons/codescan-checkmark-24.svg').default
      .src,
  'codespaces-16': require('./../../assets/DashIcons/codespaces-16.svg')
    .default.src,
  'codespaces-24': require('./../../assets/DashIcons/codespaces-24.svg')
    .default.src,
  'columns-16': require('./../../assets/DashIcons/columns-16.svg').default
    .src,
  'columns-24': require('./../../assets/DashIcons/columns-24.svg').default
    .src,
  'command-palette-16':
    require('./../../assets/DashIcons/command-palette-16.svg').default.src,
  'command-palette-24':
    require('./../../assets/DashIcons/command-palette-24.svg').default.src,
  'comment-16': require('./../../assets/DashIcons/comment-16.svg').default
    .src,
  'comment-24': require('./../../assets/DashIcons/comment-24.svg').default
    .src,
  'comment-discussion-16':
    require('./../../assets/DashIcons/comment-discussion-16.svg').default
      .src,
  'comment-discussion-24':
    require('./../../assets/DashIcons/comment-discussion-24.svg').default
      .src,
  'commit-24': require('./../../assets/DashIcons/commit-24.svg').default.src,
  'container-16': require('./../../assets/DashIcons/container-16.svg')
    .default.src,
  'container-24': require('./../../assets/DashIcons/container-24.svg')
    .default.src,
  'copilot-16': require('./../../assets/DashIcons/copilot-16.svg').default
    .src,
  'copilot-24': require('./../../assets/DashIcons/copilot-24.svg').default
    .src,
  'copilot-48': require('./../../assets/DashIcons/copilot-48.svg').default
    .src,
  'copilot-96': require('./../../assets/DashIcons/copilot-96.svg').default
    .src,
  'copilot-error-16':
    require('./../../assets/DashIcons/copilot-error-16.svg').default.src,
  'copilot-warning-16':
    require('./../../assets/DashIcons/copilot-warning-16.svg').default.src,
  'copy-16': require('./../../assets/DashIcons/copy-16.svg').default.src,
  'copy-24': require('./../../assets/DashIcons/copy-24.svg').default.src,
  'cpu-16': require('./../../assets/DashIcons/cpu-16.svg').default.src,
  'cpu-24': require('./../../assets/DashIcons/cpu-24.svg').default.src,
  'credit-card-16': require('./../../assets/DashIcons/credit-card-16.svg')
    .default.src,
  'credit-card-24': require('./../../assets/DashIcons/credit-card-24.svg')
    .default.src,
  'cross-reference-16':
    require('./../../assets/DashIcons/cross-reference-16.svg').default.src,
  'cross-reference-24':
    require('./../../assets/DashIcons/cross-reference-24.svg').default.src,
  'dash-16': require('./../../assets/DashIcons/dash-16.svg').default.src,
  'dash-24': require('./../../assets/DashIcons/dash-24.svg').default.src,
  'database-16': require('./../../assets/DashIcons/database-16.svg').default
    .src,
  'database-24': require('./../../assets/DashIcons/database-24.svg').default
    .src,
  'dependabot-16': require('./../../assets/DashIcons/dependabot-16.svg')
    .default.src,
  'dependabot-24': require('./../../assets/DashIcons/dependabot-24.svg')
    .default.src,
  'desktop-download-16':
    require('./../../assets/DashIcons/desktop-download-16.svg').default.src,
  'desktop-download-24':
    require('./../../assets/DashIcons/desktop-download-24.svg').default.src,
  'device-camera-16':
    require('./../../assets/DashIcons/device-camera-16.svg').default.src,
  'device-camera-video-16':
    require('./../../assets/DashIcons/device-camera-video-16.svg').default
      .src,
  'device-camera-video-24':
    require('./../../assets/DashIcons/device-camera-video-24.svg').default
      .src,
  'device-desktop-16':
    require('./../../assets/DashIcons/device-desktop-16.svg').default.src,
  'device-desktop-24':
    require('./../../assets/DashIcons/device-desktop-24.svg').default.src,
  'device-mobile-16':
    require('./../../assets/DashIcons/device-mobile-16.svg').default.src,
  'device-mobile-24':
    require('./../../assets/DashIcons/device-mobile-24.svg').default.src,
  'diamond-16': require('./../../assets/DashIcons/diamond-16.svg').default
    .src,
  'diamond-24': require('./../../assets/DashIcons/diamond-24.svg').default
    .src,
  'diff-16': require('./../../assets/DashIcons/diff-16.svg').default.src,
  'diff-24': require('./../../assets/DashIcons/diff-24.svg').default.src,
  'diff-added-16': require('./../../assets/DashIcons/diff-added-16.svg')
    .default.src,
  'diff-ignored-16': require('./../../assets/DashIcons/diff-ignored-16.svg')
    .default.src,
  'diff-modified-16':
    require('./../../assets/DashIcons/diff-modified-16.svg').default.src,
  'diff-removed-16': require('./../../assets/DashIcons/diff-removed-16.svg')
    .default.src,
  'diff-renamed-16': require('./../../assets/DashIcons/diff-renamed-16.svg')
    .default.src,
  'dot-16': require('./../../assets/DashIcons/dot-16.svg').default.src,
  'dot-24': require('./../../assets/DashIcons/dot-24.svg').default.src,
  'dot-fill-16': require('./../../assets/DashIcons/dot-fill-16.svg').default
    .src,
  'dot-fill-24': require('./../../assets/DashIcons/dot-fill-24.svg').default
    .src,
  'download-16': require('./../../assets/DashIcons/download-16.svg').default
    .src,
  'download-24': require('./../../assets/DashIcons/download-24.svg').default
    .src,
  'duplicate-16': require('./../../assets/DashIcons/duplicate-16.svg')
    .default.src,
  'duplicate-24': require('./../../assets/DashIcons/duplicate-24.svg')
    .default.src,
  'ellipsis-16': require('./../../assets/DashIcons/ellipsis-16.svg').default
    .src,
  'eye-16': require('./../../assets/DashIcons/eye-16.svg').default.src,
  'eye-24': require('./../../assets/DashIcons/eye-24.svg').default.src,
  'eye-closed-16': require('./../../assets/DashIcons/eye-closed-16.svg')
    .default.src,
  'eye-closed-24': require('./../../assets/DashIcons/eye-closed-24.svg')
    .default.src,
  'feed-discussion-16':
    require('./../../assets/DashIcons/feed-discussion-16.svg').default.src,
  'feed-forked-16': require('./../../assets/DashIcons/feed-forked-16.svg')
    .default.src,
  'feed-heart-16': require('./../../assets/DashIcons/feed-heart-16.svg')
    .default.src,
  'feed-merged-16': require('./../../assets/DashIcons/feed-merged-16.svg')
    .default.src,
  'feed-person-16': require('./../../assets/DashIcons/feed-person-16.svg')
    .default.src,
  'feed-repo-16': require('./../../assets/DashIcons/feed-repo-16.svg')
    .default.src,
  'feed-rocket-16': require('./../../assets/DashIcons/feed-rocket-16.svg')
    .default.src,
  'feed-star-16': require('./../../assets/DashIcons/feed-star-16.svg')
    .default.src,
  'feed-tag-16': require('./../../assets/DashIcons/feed-tag-16.svg').default
    .src,
  'feed-trophy-16': require('./../../assets/DashIcons/feed-trophy-16.svg')
    .default.src,
  'file-16': require('./../../assets/DashIcons/file-16.svg').default.src,
  'file-24': require('./../../assets/DashIcons/file-24.svg').default.src,
  'file-added-16': require('./../../assets/DashIcons/file-added-16.svg')
    .default.src,
  'file-badge-16': require('./../../assets/DashIcons/file-badge-16.svg')
    .default.src,
  'file-binary-16': require('./../../assets/DashIcons/file-binary-16.svg')
    .default.src,
  'file-binary-24': require('./../../assets/DashIcons/file-binary-24.svg')
    .default.src,
  'file-code-16': require('./../../assets/DashIcons/file-code-16.svg')
    .default.src,
  'file-code-24': require('./../../assets/DashIcons/file-code-24.svg')
    .default.src,
  'file-diff-16': require('./../../assets/DashIcons/file-diff-16.svg')
    .default.src,
  'file-diff-24': require('./../../assets/DashIcons/file-diff-24.svg')
    .default.src,
  'file-directory-16':
    require('./../../assets/DashIcons/file-directory-16.svg').default.src,
  'file-directory-24':
    require('./../../assets/DashIcons/file-directory-24.svg').default.src,
  'file-directory-fill-16':
    require('./../../assets/DashIcons/file-directory-fill-16.svg').default
      .src,
  'file-directory-fill-24':
    require('./../../assets/DashIcons/file-directory-fill-24.svg').default
      .src,
  'file-directory-open-fill-16':
    require('./../../assets/DashIcons/file-directory-open-fill-16.svg')
      .default.src,
  'file-media-24': require('./../../assets/DashIcons/file-media-24.svg')
    .default.src,
  'file-moved-16': require('./../../assets/DashIcons/file-moved-16.svg')
    .default.src,
  'file-removed-16': require('./../../assets/DashIcons/file-removed-16.svg')
    .default.src,
  'file-submodule-16':
    require('./../../assets/DashIcons/file-submodule-16.svg').default.src,
  'file-submodule-24':
    require('./../../assets/DashIcons/file-submodule-24.svg').default.src,
  'file-symlink-file-16':
    require('./../../assets/DashIcons/file-symlink-file-16.svg').default.src,
  'file-symlink-file-24':
    require('./../../assets/DashIcons/file-symlink-file-24.svg').default.src,
  'file-zip-16': require('./../../assets/DashIcons/file-zip-16.svg').default
    .src,
  'file-zip-24': require('./../../assets/DashIcons/file-zip-24.svg').default
    .src,
  'filter-16': require('./../../assets/DashIcons/filter-16.svg').default.src,
  'filter-24': require('./../../assets/DashIcons/filter-24.svg').default.src,
  'flame-16': require('./../../assets/DashIcons/flame-16.svg').default.src,
  'flame-24': require('./../../assets/DashIcons/flame-24.svg').default.src,
  'fold-16': require('./../../assets/DashIcons/fold-16.svg').default.src,
  'fold-24': require('./../../assets/DashIcons/fold-24.svg').default.src,
  'fold-down-16': require('./../../assets/DashIcons/fold-down-16.svg')
    .default.src,
  'fold-down-24': require('./../../assets/DashIcons/fold-down-24.svg')
    .default.src,
  'fold-up-16': require('./../../assets/DashIcons/fold-up-16.svg').default
    .src,
  'fold-up-24': require('./../../assets/DashIcons/fold-up-24.svg').default
    .src,
  'gear-16': require('./../../assets/DashIcons/gear-16.svg').default.src,
  'gear-24': require('./../../assets/DashIcons/gear-24.svg').default.src,
  'gift-16': require('./../../assets/DashIcons/gift-16.svg').default.src,
  'gift-24': require('./../../assets/DashIcons/gift-24.svg').default.src,
  'git-branch-16': require('./../../assets/DashIcons/git-branch-16.svg')
    .default.src,
  'git-branch-24': require('./../../assets/DashIcons/git-branch-24.svg')
    .default.src,
  'git-commit-16': require('./../../assets/DashIcons/git-commit-16.svg')
    .default.src,
  'git-commit-24': require('./../../assets/DashIcons/git-commit-24.svg')
    .default.src,
  'git-compare-16': require('./../../assets/DashIcons/git-compare-16.svg')
    .default.src,
  'git-compare-24': require('./../../assets/DashIcons/git-compare-24.svg')
    .default.src,
  'git-merge-16': require('./../../assets/DashIcons/git-merge-16.svg')
    .default.src,
  'git-merge-24': require('./../../assets/DashIcons/git-merge-24.svg')
    .default.src,
  'git-merge-queue-16':
    require('./../../assets/DashIcons/git-merge-queue-16.svg').default.src,
  'git-pull-request-16':
    require('./../../assets/DashIcons/git-pull-request-16.svg').default.src,
  'git-pull-request-24':
    require('./../../assets/DashIcons/git-pull-request-24.svg').default.src,
  'git-pull-request-closed-16':
    require('./../../assets/DashIcons/git-pull-request-closed-16.svg')
      .default.src,
  'git-pull-request-closed-24':
    require('./../../assets/DashIcons/git-pull-request-closed-24.svg')
      .default.src,
  'git-pull-request-draft-16':
    require('./../../assets/DashIcons/git-pull-request-draft-16.svg').default
      .src,
  'git-pull-request-draft-24':
    require('./../../assets/DashIcons/git-pull-request-draft-24.svg').default
      .src,
  'globe-16': require('./../../assets/DashIcons/globe-16.svg').default.src,
  'globe-24': require('./../../assets/DashIcons/globe-24.svg').default.src,
  'grabber-16': require('./../../assets/DashIcons/grabber-16.svg').default
    .src,
  'grabber-24': require('./../../assets/DashIcons/grabber-24.svg').default
    .src,
  'graph-16': require('./../../assets/DashIcons/graph-16.svg').default.src,
  'graph-24': require('./../../assets/DashIcons/graph-24.svg').default.src,
  'hash-16': require('./../../assets/DashIcons/hash-16.svg').default.src,
  'hash-24': require('./../../assets/DashIcons/hash-24.svg').default.src,
  'heading-16': require('./../../assets/DashIcons/heading-16.svg').default
    .src,
  'heading-24': require('./../../assets/DashIcons/heading-24.svg').default
    .src,
  'heart-16': require('./../../assets/DashIcons/heart-16.svg').default.src,
  'heart-24': require('./../../assets/DashIcons/heart-24.svg').default.src,
  'heart-fill-16': require('./../../assets/DashIcons/heart-fill-16.svg')
    .default.src,
  'heart-fill-24': require('./../../assets/DashIcons/heart-fill-24.svg')
    .default.src,
  'history-16': require('./../../assets/DashIcons/history-16.svg').default
    .src,
  'history-24': require('./../../assets/DashIcons/history-24.svg').default
    .src,
  'home-16': require('./../../assets/DashIcons/home-16.svg').default.src,
  'home-24': require('./../../assets/DashIcons/home-24.svg').default.src,
  'home-fill-24': require('./../../assets/DashIcons/home-fill-24.svg')
    .default.src,
  'horizontal-rule-16':
    require('./../../assets/DashIcons/horizontal-rule-16.svg').default.src,
  'horizontal-rule-24':
    require('./../../assets/DashIcons/horizontal-rule-24.svg').default.src,
  'hourglass-16': require('./../../assets/DashIcons/hourglass-16.svg')
    .default.src,
  'hourglass-24': require('./../../assets/DashIcons/hourglass-24.svg')
    .default.src,
  'hubot-16': require('./../../assets/DashIcons/hubot-16.svg').default.src,
  'hubot-24': require('./../../assets/DashIcons/hubot-24.svg').default.src,
  'id-badge-16': require('./../../assets/DashIcons/id-badge-16.svg').default
    .src,
  'image-16': require('./../../assets/DashIcons/image-16.svg').default.src,
  'image-24': require('./../../assets/DashIcons/image-24.svg').default.src,
  'inbox-16': require('./../../assets/DashIcons/inbox-16.svg').default.src,
  'inbox-24': require('./../../assets/DashIcons/inbox-24.svg').default.src,
  'infinity-16': require('./../../assets/DashIcons/infinity-16.svg').default
    .src,
  'infinity-24': require('./../../assets/DashIcons/infinity-24.svg').default
    .src,
  'info-16': require('./../../assets/DashIcons/info-16.svg').default.src,
  'info-24': require('./../../assets/DashIcons/info-24.svg').default.src,
  'issue-closed-16': require('./../../assets/DashIcons/issue-closed-16.svg')
    .default.src,
  'issue-closed-24': require('./../../assets/DashIcons/issue-closed-24.svg')
    .default.src,
  'issue-draft-16': require('./../../assets/DashIcons/issue-draft-16.svg')
    .default.src,
  'issue-draft-24': require('./../../assets/DashIcons/issue-draft-24.svg')
    .default.src,
  'issue-opened-16': require('./../../assets/DashIcons/issue-opened-16.svg')
    .default.src,
  'issue-opened-24': require('./../../assets/DashIcons/issue-opened-24.svg')
    .default.src,
  'issue-reopened-16':
    require('./../../assets/DashIcons/issue-reopened-16.svg').default.src,
  'issue-reopened-24':
    require('./../../assets/DashIcons/issue-reopened-24.svg').default.src,
  'italic-16': require('./../../assets/DashIcons/italic-16.svg').default.src,
  'italic-24': require('./../../assets/DashIcons/italic-24.svg').default.src,
  'iterations-16': require('./../../assets/DashIcons/iterations-16.svg')
    .default.src,
  'iterations-24': require('./../../assets/DashIcons/iterations-24.svg')
    .default.src,
  'kebab-horizontal-16':
    require('./../../assets/DashIcons/kebab-horizontal-16.svg').default.src,
  'kebab-horizontal-24':
    require('./../../assets/DashIcons/kebab-horizontal-24.svg').default.src,
  'key-16': require('./../../assets/DashIcons/key-16.svg').default.src,
  'key-24': require('./../../assets/DashIcons/key-24.svg').default.src,
  'key-asterisk-16': require('./../../assets/DashIcons/key-asterisk-16.svg')
    .default.src,
  'law-16': require('./../../assets/DashIcons/law-16.svg').default.src,
  'law-24': require('./../../assets/DashIcons/law-24.svg').default.src,
  'light-bulb-16': require('./../../assets/DashIcons/light-bulb-16.svg')
    .default.src,
  'light-bulb-24': require('./../../assets/DashIcons/light-bulb-24.svg')
    .default.src,
  'link-16': require('./../../assets/DashIcons/link-16.svg').default.src,
  'link-24': require('./../../assets/DashIcons/link-24.svg').default.src,
  'link-external-16':
    require('./../../assets/DashIcons/link-external-16.svg').default.src,
  'link-external-24':
    require('./../../assets/DashIcons/link-external-24.svg').default.src,
  'list-ordered-16': require('./../../assets/DashIcons/list-ordered-16.svg')
    .default.src,
  'list-ordered-24': require('./../../assets/DashIcons/list-ordered-24.svg')
    .default.src,
  'list-unordered-16':
    require('./../../assets/DashIcons/list-unordered-16.svg').default.src,
  'list-unordered-24':
    require('./../../assets/DashIcons/list-unordered-24.svg').default.src,
  'location-16': require('./../../assets/DashIcons/location-16.svg').default
    .src,
  'location-24': require('./../../assets/DashIcons/location-24.svg').default
    .src,
  'lock-16': require('./../../assets/DashIcons/lock-16.svg').default.src,
  'lock-24': require('./../../assets/DashIcons/lock-24.svg').default.src,
  'log-16': require('./../../assets/DashIcons/log-16.svg').default.src,
  'logo-gist-16': require('./../../assets/DashIcons/logo-gist-16.svg')
    .default.src,
  'logo-github-16': require('./../../assets/DashIcons/logo-github-16.svg')
    .default.src,
  'mail-16': require('./../../assets/DashIcons/mail-16.svg').default.src,
  'mail-24': require('./../../assets/DashIcons/mail-24.svg').default.src,
  'mark-github-16': require('./../../assets/DashIcons/mark-github-16.svg')
    .default.src,
  'markdown-16': require('./../../assets/DashIcons/markdown-16.svg').default
    .src,
  'megaphone-16': require('./../../assets/DashIcons/megaphone-16.svg')
    .default.src,
  'megaphone-24': require('./../../assets/DashIcons/megaphone-24.svg')
    .default.src,
  'mention-16': require('./../../assets/DashIcons/mention-16.svg').default
    .src,
  'mention-24': require('./../../assets/DashIcons/mention-24.svg').default
    .src,
  'meter-16': require('./../../assets/DashIcons/meter-16.svg').default.src,
  'milestone-16': require('./../../assets/DashIcons/milestone-16.svg')
    .default.src,
  'milestone-24': require('./../../assets/DashIcons/milestone-24.svg')
    .default.src,
  'mirror-16': require('./../../assets/DashIcons/mirror-16.svg').default.src,
  'mirror-24': require('./../../assets/DashIcons/mirror-24.svg').default.src,
  'moon-16': require('./../../assets/DashIcons/moon-16.svg').default.src,
  'moon-24': require('./../../assets/DashIcons/moon-24.svg').default.src,
  'mortar-board-16': require('./../../assets/DashIcons/mortar-board-16.svg')
    .default.src,
  'mortar-board-24': require('./../../assets/DashIcons/mortar-board-24.svg')
    .default.src,
  'multi-select-16': require('./../../assets/DashIcons/multi-select-16.svg')
    .default.src,
  'multi-select-24': require('./../../assets/DashIcons/multi-select-24.svg')
    .default.src,
  'mute-16': require('./../../assets/DashIcons/mute-16.svg').default.src,
  'mute-24': require('./../../assets/DashIcons/mute-24.svg').default.src,
  'no-entry-16': require('./../../assets/DashIcons/no-entry-16.svg').default
    .src,
  'no-entry-24': require('./../../assets/DashIcons/no-entry-24.svg').default
    .src,
  'no-entry-fill-12':
    require('./../../assets/DashIcons/no-entry-fill-12.svg').default.src,
  'north-star-16': require('./../../assets/DashIcons/north-star-16.svg')
    .default.src,
  'north-star-24': require('./../../assets/DashIcons/north-star-24.svg')
    .default.src,
  'note-16': require('./../../assets/DashIcons/note-16.svg').default.src,
  'note-24': require('./../../assets/DashIcons/note-24.svg').default.src,
  'number-16': require('./../../assets/DashIcons/number-16.svg').default.src,
  'number-24': require('./../../assets/DashIcons/number-24.svg').default.src,
  'organization-16': require('./../../assets/DashIcons/organization-16.svg')
    .default.src,
  'organization-24': require('./../../assets/DashIcons/organization-24.svg')
    .default.src,
  'package-16': require('./../../assets/DashIcons/package-16.svg').default
    .src,
  'package-24': require('./../../assets/DashIcons/package-24.svg').default
    .src,
  'package-dependencies-16':
    require('./../../assets/DashIcons/package-dependencies-16.svg').default
      .src,
  'package-dependencies-24':
    require('./../../assets/DashIcons/package-dependencies-24.svg').default
      .src,
  'package-dependents-16':
    require('./../../assets/DashIcons/package-dependents-16.svg').default
      .src,
  'package-dependents-24':
    require('./../../assets/DashIcons/package-dependents-24.svg').default
      .src,
  'paintbrush-16': require('./../../assets/DashIcons/paintbrush-16.svg')
    .default.src,
  'paper-airplane-16':
    require('./../../assets/DashIcons/paper-airplane-16.svg').default.src,
  'paper-airplane-24':
    require('./../../assets/DashIcons/paper-airplane-24.svg').default.src,
  'paperclip-16': require('./../../assets/DashIcons/paperclip-16.svg')
    .default.src,
  'paperclip-24': require('./../../assets/DashIcons/paperclip-24.svg')
    .default.src,
  'paste-16': require('./../../assets/DashIcons/paste-16.svg').default.src,
  'paste-24': require('./../../assets/DashIcons/paste-24.svg').default.src,
  'pencil-16': require('./../../assets/DashIcons/pencil-16.svg').default.src,
  'pencil-24': require('./../../assets/DashIcons/pencil-24.svg').default.src,
  'people-16': require('./../../assets/DashIcons/people-16.svg').default.src,
  'people-24': require('./../../assets/DashIcons/people-24.svg').default.src,
  'person-16': require('./../../assets/DashIcons/person-16.svg').default.src,
  'person-24': require('./../../assets/DashIcons/person-24.svg').default.src,
  'person-add-16': require('./../../assets/DashIcons/person-add-16.svg')
    .default.src,
  'person-add-24': require('./../../assets/DashIcons/person-add-24.svg')
    .default.src,
  'person-fill-16': require('./../../assets/DashIcons/person-fill-16.svg')
    .default.src,
  'person-fill-24': require('./../../assets/DashIcons/person-fill-24.svg')
    .default.src,
  'pin-16': require('./../../assets/DashIcons/pin-16.svg').default.src,
  'pin-24': require('./../../assets/DashIcons/pin-24.svg').default.src,
  'play-16': require('./../../assets/DashIcons/play-16.svg').default.src,
  'play-24': require('./../../assets/DashIcons/play-24.svg').default.src,
  'plug-16': require('./../../assets/DashIcons/plug-16.svg').default.src,
  'plug-24': require('./../../assets/DashIcons/plug-24.svg').default.src,
  'plus-16': require('./../../assets/DashIcons/plus-16.svg').default.src,
  'plus-24': require('./../../assets/DashIcons/plus-24.svg').default.src,
  'plus-circle-16': require('./../../assets/DashIcons/plus-circle-16.svg')
    .default.src,
  'plus-circle-24': require('./../../assets/DashIcons/plus-circle-24.svg')
    .default.src,
  'project-16': require('./../../assets/DashIcons/project-16.svg').default
    .src,
  'project-24': require('./../../assets/DashIcons/project-24.svg').default
    .src,
  'pulse-16': require('./../../assets/DashIcons/pulse-16.svg').default.src,
  'pulse-24': require('./../../assets/DashIcons/pulse-24.svg').default.src,
  'question-16': require('./../../assets/DashIcons/question-16.svg').default
    .src,
  'question-24': require('./../../assets/DashIcons/question-24.svg').default
    .src,
  'quote-16': require('./../../assets/DashIcons/quote-16.svg').default.src,
  'quote-24': require('./../../assets/DashIcons/quote-24.svg').default.src,
  'reply-16': require('./../../assets/DashIcons/reply-16.svg').default.src,
  'reply-24': require('./../../assets/DashIcons/reply-24.svg').default.src,
  'repo-16': require('./../../assets/DashIcons/repo-16.svg').default.src,
  'repo-24': require('./../../assets/DashIcons/repo-24.svg').default.src,
  'repo-clone-16': require('./../../assets/DashIcons/repo-clone-16.svg')
    .default.src,
  'repo-deleted-16': require('./../../assets/DashIcons/repo-deleted-16.svg')
    .default.src,
  'repo-forked-16': require('./../../assets/DashIcons/repo-forked-16.svg')
    .default.src,
  'repo-forked-24': require('./../../assets/DashIcons/repo-forked-24.svg')
    .default.src,
  'repo-locked-16': require('./../../assets/DashIcons/repo-locked-16.svg')
    .default.src,
  'repo-locked-24': require('./../../assets/DashIcons/repo-locked-24.svg')
    .default.src,
  'repo-pull-16': require('./../../assets/DashIcons/repo-pull-16.svg')
    .default.src,
  'repo-push-16': require('./../../assets/DashIcons/repo-push-16.svg')
    .default.src,
  'repo-push-24': require('./../../assets/DashIcons/repo-push-24.svg')
    .default.src,
  'repo-template-16':
    require('./../../assets/DashIcons/repo-template-16.svg').default.src,
  'repo-template-24':
    require('./../../assets/DashIcons/repo-template-24.svg').default.src,
  'report-16': require('./../../assets/DashIcons/report-16.svg').default.src,
  'report-24': require('./../../assets/DashIcons/report-24.svg').default.src,
  'rocket-16': require('./../../assets/DashIcons/rocket-16.svg').default.src,
  'rocket-24': require('./../../assets/DashIcons/rocket-24.svg').default.src,
  'rows-16': require('./../../assets/DashIcons/rows-16.svg').default.src,
  'rows-24': require('./../../assets/DashIcons/rows-24.svg').default.src,
  'rss-16': require('./../../assets/DashIcons/rss-16.svg').default.src,
  'rss-24': require('./../../assets/DashIcons/rss-24.svg').default.src,
  'ruby-16': require('./../../assets/DashIcons/ruby-16.svg').default.src,
  'ruby-24': require('./../../assets/DashIcons/ruby-24.svg').default.src,
  'screen-full-16': require('./../../assets/DashIcons/screen-full-16.svg')
    .default.src,
  'screen-full-24': require('./../../assets/DashIcons/screen-full-24.svg')
    .default.src,
  'screen-normal-16':
    require('./../../assets/DashIcons/screen-normal-16.svg').default.src,
  'screen-normal-24':
    require('./../../assets/DashIcons/screen-normal-24.svg').default.src,
  'search-16': require('./../../assets/DashIcons/search-16.svg').default.src,
  'search-24': require('./../../assets/DashIcons/search-24.svg').default.src,
  'server-16': require('./../../assets/DashIcons/server-16.svg').default.src,
  'server-24': require('./../../assets/DashIcons/server-24.svg').default.src,
  'share-16': require('./../../assets/DashIcons/share-16.svg').default.src,
  'share-24': require('./../../assets/DashIcons/share-24.svg').default.src,
  'share-android-16':
    require('./../../assets/DashIcons/share-android-16.svg').default.src,
  'share-android-24':
    require('./../../assets/DashIcons/share-android-24.svg').default.src,
  'shield-16': require('./../../assets/DashIcons/shield-16.svg').default.src,
  'shield-24': require('./../../assets/DashIcons/shield-24.svg').default.src,
  'shield-check-16': require('./../../assets/DashIcons/shield-check-16.svg')
    .default.src,
  'shield-check-24': require('./../../assets/DashIcons/shield-check-24.svg')
    .default.src,
  'shield-lock-16': require('./../../assets/DashIcons/shield-lock-16.svg')
    .default.src,
  'shield-lock-24': require('./../../assets/DashIcons/shield-lock-24.svg')
    .default.src,
  'shield-slash-16': require('./../../assets/DashIcons/shield-slash-16.svg')
    .default.src,
  'shield-x-16': require('./../../assets/DashIcons/shield-x-16.svg').default
    .src,
  'shield-x-24': require('./../../assets/DashIcons/shield-x-24.svg').default
    .src,
  'sidebar-collapse-16':
    require('./../../assets/DashIcons/sidebar-collapse-16.svg').default.src,
  'sidebar-collapse-24':
    require('./../../assets/DashIcons/sidebar-collapse-24.svg').default.src,
  'sidebar-expand-16':
    require('./../../assets/DashIcons/sidebar-expand-16.svg').default.src,
  'sidebar-expand-24':
    require('./../../assets/DashIcons/sidebar-expand-24.svg').default.src,
  'sign-in-16': require('./../../assets/DashIcons/sign-in-16.svg').default
    .src,
  'sign-in-24': require('./../../assets/DashIcons/sign-in-24.svg').default
    .src,
  'sign-out-16': require('./../../assets/DashIcons/sign-out-16.svg').default
    .src,
  'sign-out-24': require('./../../assets/DashIcons/sign-out-24.svg').default
    .src,
  'single-select-16':
    require('./../../assets/DashIcons/single-select-16.svg').default.src,
  'single-select-24':
    require('./../../assets/DashIcons/single-select-24.svg').default.src,
  'skip-16': require('./../../assets/DashIcons/skip-16.svg').default.src,
  'skip-24': require('./../../assets/DashIcons/skip-24.svg').default.src,
  'sliders-16': require('./../../assets/DashIcons/sliders-16.svg').default
    .src,
  'smiley-16': require('./../../assets/DashIcons/smiley-16.svg').default.src,
  'smiley-24': require('./../../assets/DashIcons/smiley-24.svg').default.src,
  'sort-asc-16': require('./../../assets/DashIcons/sort-asc-16.svg').default
    .src,
  'sort-asc-24': require('./../../assets/DashIcons/sort-asc-24.svg').default
    .src,
  'sort-desc-16': require('./../../assets/DashIcons/sort-desc-16.svg')
    .default.src,
  'sort-desc-24': require('./../../assets/DashIcons/sort-desc-24.svg')
    .default.src,
  'square-16': require('./../../assets/DashIcons/square-16.svg').default.src,
  'square-24': require('./../../assets/DashIcons/square-24.svg').default.src,
  'square-fill-16': require('./../../assets/DashIcons/square-fill-16.svg')
    .default.src,
  'square-fill-24': require('./../../assets/DashIcons/square-fill-24.svg')
    .default.src,
  'squirrel-16': require('./../../assets/DashIcons/squirrel-16.svg').default
    .src,
  'squirrel-24': require('./../../assets/DashIcons/squirrel-24.svg').default
    .src,
  'stack-16': require('./../../assets/DashIcons/stack-16.svg').default.src,
  'stack-24': require('./../../assets/DashIcons/stack-24.svg').default.src,
  'star-16': require('./../../assets/DashIcons/star-16.svg').default.src,
  'star-24': require('./../../assets/DashIcons/star-24.svg').default.src,
  'star-fill-16': require('./../../assets/DashIcons/star-fill-16.svg')
    .default.src,
  'star-fill-24': require('./../../assets/DashIcons/star-fill-24.svg')
    .default.src,
  'stop-16': require('./../../assets/DashIcons/stop-16.svg').default.src,
  'stop-24': require('./../../assets/DashIcons/stop-24.svg').default.src,
  'stopwatch-16': require('./../../assets/DashIcons/stopwatch-16.svg')
    .default.src,
  'stopwatch-24': require('./../../assets/DashIcons/stopwatch-24.svg')
    .default.src,
  'strikethrough-16':
    require('./../../assets/DashIcons/strikethrough-16.svg').default.src,
  'strikethrough-24':
    require('./../../assets/DashIcons/strikethrough-24.svg').default.src,
  'sun-16': require('./../../assets/DashIcons/sun-16.svg').default.src,
  'sun-24': require('./../../assets/DashIcons/sun-24.svg').default.src,
  'sync-16': require('./../../assets/DashIcons/sync-16.svg').default.src,
  'sync-24': require('./../../assets/DashIcons/sync-24.svg').default.src,
  'tab-24': require('./../../assets/DashIcons/tab-24.svg').default.src,
  'tab-external-16': require('./../../assets/DashIcons/tab-external-16.svg')
    .default.src,
  'table-16': require('./../../assets/DashIcons/table-16.svg').default.src,
  'table-24': require('./../../assets/DashIcons/table-24.svg').default.src,
  'tag-16': require('./../../assets/DashIcons/tag-16.svg').default.src,
  'tag-24': require('./../../assets/DashIcons/tag-24.svg').default.src,
  'tasklist-16': require('./../../assets/DashIcons/tasklist-16.svg').default
    .src,
  'tasklist-24': require('./../../assets/DashIcons/tasklist-24.svg').default
    .src,
  'telescope-16': require('./../../assets/DashIcons/telescope-16.svg')
    .default.src,
  'telescope-24': require('./../../assets/DashIcons/telescope-24.svg')
    .default.src,
  'telescope-fill-16':
    require('./../../assets/DashIcons/telescope-fill-16.svg').default.src,
  'telescope-fill-24':
    require('./../../assets/DashIcons/telescope-fill-24.svg').default.src,
  'terminal-16': require('./../../assets/DashIcons/terminal-16.svg').default
    .src,
  'terminal-24': require('./../../assets/DashIcons/terminal-24.svg').default
    .src,
  'three-bars-16': require('./../../assets/DashIcons/three-bars-16.svg')
    .default.src,
  'thumbsdown-16': require('./../../assets/DashIcons/thumbsdown-16.svg')
    .default.src,
  'thumbsdown-24': require('./../../assets/DashIcons/thumbsdown-24.svg')
    .default.src,
  'thumbsup-16': require('./../../assets/DashIcons/thumbsup-16.svg').default
    .src,
  'thumbsup-24': require('./../../assets/DashIcons/thumbsup-24.svg').default
    .src,
  'tools-16': require('./../../assets/DashIcons/tools-16.svg').default.src,
  'tools-24': require('./../../assets/DashIcons/tools-24.svg').default.src,
  'trash-16': require('./../../assets/DashIcons/trash-16.svg').default.src,
  'trash-24': require('./../../assets/DashIcons/trash-24.svg').default.src,
  'triangle-down-16':
    require('./../../assets/DashIcons/triangle-down-16.svg').default.src,
  'triangle-down-24':
    require('./../../assets/DashIcons/triangle-down-24.svg').default.src,
  'triangle-left-16':
    require('./../../assets/DashIcons/triangle-left-16.svg').default.src,
  'triangle-left-24':
    require('./../../assets/DashIcons/triangle-left-24.svg').default.src,
  'triangle-right-16':
    require('./../../assets/DashIcons/triangle-right-16.svg').default.src,
  'triangle-right-24':
    require('./../../assets/DashIcons/triangle-right-24.svg').default.src,
  'triangle-up-16': require('./../../assets/DashIcons/triangle-up-16.svg')
    .default.src,
  'triangle-up-24': require('./../../assets/DashIcons/triangle-up-24.svg')
    .default.src,
  'trophy-16': require('./../../assets/DashIcons/trophy-16.svg').default.src,
  'trophy-24': require('./../../assets/DashIcons/trophy-24.svg').default.src,
  'typography-16': require('./../../assets/DashIcons/typography-16.svg')
    .default.src,
  'typography-24': require('./../../assets/DashIcons/typography-24.svg')
    .default.src,
  'unfold-16': require('./../../assets/DashIcons/unfold-16.svg').default.src,
  'unfold-24': require('./../../assets/DashIcons/unfold-24.svg').default.src,
  'unlock-16': require('./../../assets/DashIcons/unlock-16.svg').default.src,
  'unlock-24': require('./../../assets/DashIcons/unlock-24.svg').default.src,
  'unmute-16': require('./../../assets/DashIcons/unmute-16.svg').default.src,
  'unmute-24': require('./../../assets/DashIcons/unmute-24.svg').default.src,
  'unverified-16': require('./../../assets/DashIcons/unverified-16.svg')
    .default.src,
  'unverified-24': require('./../../assets/DashIcons/unverified-24.svg')
    .default.src,
  'upload-16': require('./../../assets/DashIcons/upload-16.svg').default.src,
  'upload-24': require('./../../assets/DashIcons/upload-24.svg').default.src,
  'verified-16': require('./../../assets/DashIcons/verified-16.svg').default
    .src,
  'verified-24': require('./../../assets/DashIcons/verified-24.svg').default
    .src,
  'versions-16': require('./../../assets/DashIcons/versions-16.svg').default
    .src,
  'versions-24': require('./../../assets/DashIcons/versions-24.svg').default
    .src,
  'video-16': require('./../../assets/DashIcons/video-16.svg').default.src,
  'video-24': require('./../../assets/DashIcons/video-24.svg').default.src,
  'webhook-16': require('./../../assets/DashIcons/webhook-16.svg').default
    .src,
  'workflow-16': require('./../../assets/DashIcons/workflow-16.svg').default
    .src,
  'workflow-24': require('./../../assets/DashIcons/workflow-24.svg').default
    .src,
  'x-16': require('./../../assets/DashIcons/x-16.svg').default.src,
  'x-24': require('./../../assets/DashIcons/x-24.svg').default.src,
  'x-circle-16': require('./../../assets/DashIcons/x-circle-16.svg').default
    .src,
  'x-circle-24': require('./../../assets/DashIcons/x-circle-24.svg').default
    .src,
  'x-circle-fill-12':
    require('./../../assets/DashIcons/x-circle-fill-12.svg').default.src,
  'x-circle-fill-16':
    require('./../../assets/DashIcons/x-circle-fill-16.svg').default.src,
  'x-circle-fill-24':
    require('./../../assets/DashIcons/x-circle-fill-24.svg').default.src,
  'zap-16': require('./../../assets/DashIcons/zap-16.svg').default.src,
  'zap-24': require('./../../assets/DashIcons/zap-24.svg').default.src,
  'devdash-logo': require('../../assets/DashIcons/devdash-logo.svg').default.src
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
