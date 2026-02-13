export const PROBLEMS = {
  "sliding-window-maximum": {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Deque • Monotonic Queue",
    description: { text: "Return max in each sliding window.", notes: [] },
    examples: [
      { input: "nums=[1,3,-1,-3,5,3,6,7], k=3", output: "[3,3,5,5,6,7]" },
    ],
    constraints: [],
    starterCode: {
      javascript: `function maxSlidingWindow(nums,k){}`,
      python: `def maxSlidingWindow(nums,k):
    pass`,
      java: `class Solution { public int[] maxSlidingWindow(int[] nums,int k){ return new int[0]; } }`,
    },
    expectedOutput: {
      javascript: "[3,3,5,5,6,7]",
      python: "[3, 3, 5, 5, 6, 7]",
      java: "[3, 3, 5, 5, 6, 7]",
    },
  },
  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers • Stack",
    description: {
      text: "Compute how much water it can trap after raining.",
      notes: [],
    },
    examples: [{ input: "height=[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["n ≤ 2 * 10⁴"],
    starterCode: {
      javascript: `function trap(height){}`,
      python: `def trap(height):
    pass`,
      java: `class Solution { public int trap(int[] height){ return 0; } }`,
    },
    expectedOutput: { javascript: "6", python: "6", java: "6" },
  },

  "serialize-and-deserialize-binary-tree": {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Tree • Design",
    description: {
      text: "Design an algorithm to serialize and deserialize a binary tree.",
      notes: [],
    },
    examples: [
      { input: "root=[1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
    ],
    constraints: [],
    starterCode: {
      javascript: `var serialize=function(root){}; var deserialize=function(data){};`,
      python: `class Codec:
    def serialize(self,root): pass
    def deserialize(self,data): pass`,
      java: `class Codec { public String serialize(TreeNode root){return "";} public TreeNode deserialize(String data){return null;} }`,
    },
    expectedOutput: {
      javascript: "[1,2,3,null,null,4,5]",
      python: "[1,2,3,null,null,4,5]",
      java: "[1,2,3,null,null,4,5]",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Dynamic Programming",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
      notes: [
        "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        "Return the maximum profit you can achieve.",
      ],
    },
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxProfit(prices) {

}`,
      python: `def maxProfit(prices):
    pass`,
      java: `class Solution {
  public int maxProfit(int[] prices) {
    return 0;
  }
}`,
    },
    expectedOutput: { javascript: "5\n0", python: "5\n0", java: "5\n0" },
  },
  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search • Divide and Conquer",
    description: {
      text: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      notes: ["The overall run time complexity should be O(log (m+n))."],
    },
    examples: [
      { input: "nums1=[1,3], nums2=[2]", output: "2.0" },
      { input: "nums1=[1,2], nums2=[3,4]", output: "2.5" },
    ],
    constraints: ["0 ≤ m,n ≤ 1000"],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    pass`,
      java: `class Solution { public double findMedianSortedArrays(int[] a,int[] b){ return 0; } }`,
    },
    expectedOutput: {
      javascript: "2.0\n2.5",
      python: "2.0\n2.5",
      java: "2.0\n2.5",
    },
  },
  "contains-duplicate": {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array • Hash Set",
    description: {
      text: "Given an integer array nums, return true if any value appears at least twice in the array.",
      notes: [],
    },
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {}`,
      python: `def containsDuplicate(nums):
    pass`,
      java: `class Solution { public boolean containsDuplicate(int[] nums){ return false; } }`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix Sum",
    description: {
      text: "Return an array answer such that answer[i] is equal to the product of all the elements except nums[i].",
      notes: ["Do not use division and solve in O(n)."],
    },
    examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }],
    constraints: ["2 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {}`,
      python: `def productExceptSelf(nums):
    pass`,
      java: `class Solution { public int[] productExceptSelf(int[] nums){ return new int[0]; } }`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]",
      python: "[24, 12, 8, 6]",
      java: "[24, 12, 8, 6]",
    },
  },
  "regular-expression-matching": {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "Dynamic Programming • String",
    description: {
      text: "Implement regular expression matching with support for '.' and '*'.",
      notes: [
        "'.' Matches any single character. '*' Matches zero or more of the preceding element.",
      ],
    },
    examples: [
      { input: 's="aa", p="a"', output: "false" },
      { input: 's="aa", p="a*"', output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 20"],
    starterCode: {
      javascript: `function isMatch(s,p){}`,
      python: `def isMatch(s,p):
    pass`,
      java: `class Solution { public boolean isMatch(String s,String p){ return false; } }`,
    },
    expectedOutput: {
      javascript: "false\ntrue",
      python: "False\nTrue",
      java: "false\ntrue",
    },
  },
  "longest-substring-without-repeating": {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴"],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {}`,
      python: `def lengthOfLongestSubstring(s):
    pass`,
      java: `class Solution { public int lengthOfLongestSubstring(String s){ return 0; } }`,
    },
    expectedOutput: { javascript: "3\n1", python: "3\n1", java: "3\n1" },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    description: {
      text: "Merge two sorted linked lists and return it as a sorted list.",
      notes: [],
    },
    examples: [{ input: "l1=[1,2,4], l2=[1,3,4]", output: "[1,1,2,3,4,4]" }],
    constraints: ["0 ≤ list size ≤ 50"],
    starterCode: {
      javascript: `function mergeTwoLists(l1, l2) {}`,
      python: `def mergeTwoLists(l1,l2):
    pass`,
      java: `class Solution { public ListNode mergeTwoLists(ListNode l1,ListNode l2){ return null; } }`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]",
      python: "[1, 1, 2, 3, 4, 4]",
      java: "[1, 1, 2, 3, 4, 4]",
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: {
      text: "You are climbing a staircase. Each time you can climb 1 or 2 steps.",
      notes: ["Return number of distinct ways to reach the top."],
    },
    examples: [{ input: "n=3", output: "3" }],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: {
      javascript: `function climbStairs(n){}`,
      python: `def climbStairs(n):
    pass`,
      java: `class Solution { public int climbStairs(int n){ return 0; } }`,
    },
    expectedOutput: { javascript: "3", python: "3", java: "3" },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: {
      text: "Determine if the input string is valid parentheses.",
      notes: [],
    },
    examples: [{ input: 's="()[]{}"', output: "true" }],
    constraints: ["1 ≤ s.length ≤ 10⁴"],
    starterCode: {
      javascript: `function isValid(s){}`,
      python: `def isValid(s):
    pass`,
      java: `class Solution { public boolean isValid(String s){ return false; } }`,
    },
    expectedOutput: { javascript: "true", python: "True", java: "true" },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: { text: "Return index of target in sorted array.", notes: [] },
    examples: [{ input: "nums=[-1,0,3,5,9,12], target=9", output: "4" }],
    constraints: ["1 ≤ nums.length ≤ 10⁴"],
    starterCode: {
      javascript: `function search(nums,target){}`,
      python: `def search(nums,target):
    pass`,
      java: `class Solution { public int search(int[] nums,int target){ return -1; } }`,
    },
    expectedOutput: { javascript: "4", python: "4", java: "4" },
  },

  "minimum-depth-binary-tree": {
    id: "minimum-depth-binary-tree",
    title: "Minimum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree • BFS",
    description: { text: "Find minimum depth of binary tree.", notes: [] },
    examples: [{ input: "root=[3,9,20,null,null,15,7]", output: "2" }],
    constraints: [],
    starterCode: {
      javascript: `function minDepth(root){}`,
      python: `def minDepth(root):
    pass`,
      java: `class Solution { public int minDepth(TreeNode root){ return 0; } }`,
    },
    expectedOutput: { javascript: "2", python: "2", java: "2" },
  },
  "merge-k-sorted-lists": {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Heap • Linked List",
    description: {
      text: "Merge k sorted linked lists and return it as one sorted list.",
      notes: [],
    },
    examples: [
      { input: "lists=[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
    constraints: ["k ≤ 10⁴"],
    starterCode: {
      javascript: `function mergeKLists(lists){}`,
      python: `def mergeKLists(lists):
    pass`,
      java: `class Solution { public ListNode mergeKLists(ListNode[] lists){ return null; } }`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4,5,6]",
      python: "[1, 1, 2, 3, 4, 4, 5, 6]",
      java: "[1, 1, 2, 3, 4, 4, 5, 6]",
    },
  },

  "top-k-frequent-elements": {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap • Hash Map",
    description: { text: "Return k most frequent elements.", notes: [] },
    examples: [{ input: "nums=[1,1,1,2,2,3], k=2", output: "[1,2]" }],
    constraints: [],
    starterCode: {
      javascript: `function topKFrequent(nums,k){}`,
      python: `def topKFrequent(nums,k):
    pass`,
      java: `class Solution { public int[] topKFrequent(int[] nums,int k){ return new int[0]; } }`,
    },
    expectedOutput: { javascript: "[1,2]", python: "[1, 2]", java: "[1, 2]" },
  },

  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },
  "edit-distance": {
    id: "edit-distance",
    title: "Edit Distance",
    difficulty: "Hard",
    category: "Dynamic Programming • String",
    description: {
      text: "Return the minimum number of operations required to convert word1 to word2.",
      notes: ["Insert, Delete, Replace allowed."],
    },
    examples: [{ input: 'word1="horse", word2="ros"', output: "3" }],
    constraints: ["0 ≤ word.length ≤ 500"],
    starterCode: {
      javascript: `function minDistance(w1,w2){}`,
      python: `def minDistance(w1,w2):
    pass`,
      java: `class Solution { public int minDistance(String w1,String w2){ return 0; } }`,
    },
    expectedOutput: { javascript: "3", python: "3", java: "3" },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: [
        "You must do this by modifying the input array in-place with O(1) extra memory.",
      ],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "word-search-ii": {
    id: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "Trie • Backtracking",
    description: { text: "Find all words in board.", notes: [] },
    examples: [
      {
        input:
          'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
    ],
    constraints: [],
    starterCode: {
      javascript: `function findWords(board,words){}`,
      python: `def findWords(board,words):
    pass`,
      java: `class Solution { public List<String> findWords(char[][] b,String[] w){ return null; } }`,
    },
    expectedOutput: {
      javascript: '["eat","oath"]',
      python: '["eat","oath"]',
      java: '["eat","oath"]',
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: [
        "Given a string s, return true if it is a palindrome, or false otherwise.",
      ],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 2 * 10⁵",
      "s consists only of printable ASCII characters",
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },
  "largest-rectangle-in-histogram": {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack • Monotonic Stack",
    description: {
      text: "Find the largest rectangle area in histogram.",
      notes: [],
    },
    examples: [{ input: "heights=[2,1,5,6,2,3]", output: "10" }],
    constraints: [],
    starterCode: {
      javascript: `function largestRectangleArea(h){}`,
      python: `def largestRectangleArea(h):
    pass`,
      java: `class Solution { public int largestRectangleArea(int[] h){ return 0; } }`,
    },
    expectedOutput: { javascript: "10", python: "10", java: "10" },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },
  "longest-valid-parentheses": {
    id: "longest-valid-parentheses",
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    category: "Stack • Dynamic Programming",
    description: {
      text: "Given a string containing just '(' and ')', find the length of the longest valid parentheses substring.",
      notes: [],
    },
    examples: [{ input: 's=")()())"', output: "4" }],
    constraints: ["0 ≤ s.length ≤ 3 * 10⁴"],
    starterCode: {
      javascript: `function longestValidParentheses(s){}`,
      python: `def longestValidParentheses(s):
    pass`,
      java: `class Solution { public int longestValidParentheses(String s){ return 0; } }`,
    },
    expectedOutput: { javascript: "4", python: "4", java: "4" },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};
