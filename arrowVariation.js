// arrowVariation.js

/**
 * Global dictionary to track how many arrows already exist
 * between two microservices (in either direction).
 * Key: "<A>-<B>" (canonical pair), Value: number of arrows drawn so far.
 */
window.arrowCurvingVariation = {};

/**
 * Builds a canonical key for a pair so "ServiceA->ServiceB"
 * is treated the same as "ServiceB->ServiceA".
 */
window.buildPairKey = function (src, dst) {
  return src < dst ? `${src}-${dst}` : `${dst}-${src}`;
};

/**
 * Retrieves and increments the variation index for a pair of microservices.
 * This index ensures repeated arrows between the same two services
 * are drawn with increasing curvature.
 */
window.getOrIncrementArrowVariation = function (src, dst) {
  const key = buildPairKey(src, dst);
  if (!(key in arrowCurvingVariation)) {
    arrowCurvingVariation[key] = 0;
  } else {
    arrowCurvingVariation[key] += 1;
  }
  return arrowCurvingVariation[key];
};
